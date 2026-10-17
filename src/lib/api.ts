export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const getGitHubAuthUrl = () => `${API_BASE_URL}/auth/github`;
export const getGitHubLinkUrl = () => `${API_BASE_URL}/auth/github/link`;

let currentAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  currentAccessToken = token;
};

export const getAccessToken = () => currentAccessToken;

export interface ApiError {
  code?: string;
  message: string;
  statusCode?: number;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: unknown;
}

class ApiClient {
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  private subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    retry = true,
  ): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    if (currentAccessToken && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${currentAccessToken}`);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // send httpOnly cookies (rt)
      });

      const data = await response.json().catch(() => ({}));

      // If token expired (401) and retry allowed, try refreshing token
      if (
        response.status === 401 &&
        retry &&
        !endpoint.includes("/auth/login") &&
        !endpoint.includes("/auth/refresh") &&
        !endpoint.includes("/auth/register")
      ) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          try {
            const refreshRes = await this.refreshToken();
            this.isRefreshing = false;
            if (refreshRes) {
              this.onTokenRefreshed(refreshRes);
              return this.request<T>(endpoint, options, false);
            }
          } catch {
            this.isRefreshing = false;
            setAccessToken(null);
            throw (
              data?.error || {
                message:
                  data?.message || "Session expired. Please sign in again.",
                statusCode: 401,
              }
            );
          }
        } else {
          return new Promise((resolve, reject) => {
            this.subscribeTokenRefresh(async () => {
              try {
                const res = await this.request<T>(endpoint, options, false);
                resolve(res);
              } catch (err) {
                reject(err);
              }
            });
          });
        }
      }

      if (!response.ok || data.success === false) {
        const errorMsg =
          data.message ||
          (typeof data.error === "string" ? data.error : data.error?.message) ||
          "An unexpected error occurred. Please try again.";

        throw {
          statusCode: response.status,
          message: errorMsg,
          details: data.error,
        } as ApiError;
      }

      return data;
    } catch (err: any) {
      if (err.statusCode && err.message) {
        throw err;
      }
      throw {
        statusCode: 500,
        message:
          err.message ||
          "Could not connect to the server. Please check your network.",
      } as ApiError;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));
      if (data.success && data.data?.accessToken) {
        setAccessToken(data.data.accessToken);
        return data.data.accessToken;
      }
      return null;
    } catch {
      return null;
    }
  }

  get<T = any>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T = any>(endpoint: string, body?: any, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T = any>(endpoint: string, body?: any, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T = any>(endpoint: string, options: RequestInit = {}) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new ApiClient();
