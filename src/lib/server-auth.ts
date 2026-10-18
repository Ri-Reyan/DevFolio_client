import { cookies } from "next/headers";
import { API_BASE_URL } from "./api";

export interface ServerSessionUser {
  id: string;
  email: string;
  role: string;
  status: string;
  fullName?: string | null;
  onboardingCompleted?: boolean;
}

export interface ServerSessionResult {
  isAuthenticated: boolean;
  user: ServerSessionUser | null;
}

/**
 * Validates session cookies authoritatively against the backend.
 *
 * Rules:
 * 1. If neither accessToken nor refreshToken cookies exist, the user is unauthenticated (0ms fast path).
 * 2. If cookies exist, validates with backend /auth/me and falls back to /auth/refresh if accessToken expired.
 * 3. Does NOT trust cookie presence alone: handles expired, invalid, and revoked sessions safely.
 * 4. Fails closed (returns isAuthenticated: false) if backend is unreachable or returns 401/403.
 */
export async function validateTokensAuthoritatively(
  accessToken?: string,
  refreshToken?: string,
  fetchFn: typeof fetch = fetch,
): Promise<ServerSessionResult> {
  // Rule A fast path: Zero cookies means unauthenticated
  if (!accessToken && !refreshToken) {
    return { isAuthenticated: false, user: null };
  }

  const cookieHeader = [
    accessToken ? `accessToken=${accessToken}` : "",
    refreshToken ? `refreshToken=${refreshToken}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  try {
    // 1. Try /auth/me with existing accessToken or cookies
    const meHeaders: Record<string, string> = {
      Cookie: cookieHeader,
    };
    if (accessToken) {
      meHeaders.Authorization = `Bearer ${accessToken}`;
    }

    const meRes = await fetchFn(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: meHeaders,
      cache: "no-store",
    });

    if (meRes.ok) {
      const data = await meRes.json().catch(() => null);
      if (data?.success && data?.data?.user) {
        return {
          isAuthenticated: true,
          user: data.data.user,
        };
      }
    }

    // 2. If /auth/me failed (e.g. accessToken expired or missing) and refreshToken exists, try /auth/refresh
    if (refreshToken) {
      const refreshRes = await fetchFn(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json().catch(() => null);
        if (refreshData?.success && refreshData?.data?.user) {
          return {
            isAuthenticated: true,
            user: refreshData.data.user,
          };
        }
      }
    }

    // Both checks failed: cookies are invalid, expired, or revoked
    return { isAuthenticated: false, user: null };
  } catch {
    // Fail-safe: if backend is unreachable or network error, treat visitor as unauthenticated
    return { isAuthenticated: false, user: null };
  }
}

/**
 * Server-side helper to inspect request cookies and resolve authoritative session.
 */
export async function getServerSession(): Promise<ServerSessionResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    return await validateTokensAuthoritatively(accessToken, refreshToken);
  } catch {
    return { isAuthenticated: false, user: null };
  }
}

