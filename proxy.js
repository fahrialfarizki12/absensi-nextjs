import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const roles = request.cookies.get("roles")?.value;

  const isAuthRoute = pathname.startsWith("/auth");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  /* ===============================
     1️⃣ SUDAH LOGIN → LARANG AUTH
  =============================== */
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /* ===============================
     2️⃣ BELUM LOGIN → LARANG DASHBOARD
  =============================== */
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  /* ===============================
     3️⃣ ROLE BASE ACCESS
  =============================== */

  // ADMIN → bebas
  if (roles === "admin") {
    return NextResponse.next();
  }

  // SISWA → dilarang admin & admin-pembimbing
  if (
    roles === "siswa" &&
    (pathname.startsWith("/dashboard/admin") ||
      pathname.startsWith("/dashboard/admin-pembimbing"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // GURU PEMBIMBING → dilarang admin
  if (roles === "guru-pembimbing" && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

/* ===============================
   4️⃣ ROUTE MATCHER
=============================== */
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
