import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const roles = request.cookies.get("roles")?.value;

  const isAuthRoute = pathname.startsWith("/auth");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  
  /* ===============================
     2️⃣ BELUM LOGIN → LARANG DASHBOARD
  =============================== */
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

/* ===============================
   4️⃣ ROUTE MATCHER
=============================== */
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
