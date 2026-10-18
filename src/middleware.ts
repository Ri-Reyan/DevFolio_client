import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasAnyAuthCookie = Boolean(accessToken || refreshToken);

  // Fast-path protection: If a visitor has NO cookies at all, they cannot be authenticated.
  // Immediately redirect to /login without rendering the dashboard shell or hydrating client bundles.
  const isProtectedDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/resume") ||
    pathname.startsWith("/interview");

  if (isProtectedDashboardRoute && !hasAnyAuthCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/resume/:path*",
    "/interview/:path*",
  ],
};
