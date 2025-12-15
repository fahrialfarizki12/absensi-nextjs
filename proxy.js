import { NextResponse } from "next/server";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const roles = request.cookies.get("roles")?.value;
  const { pathname } = request.nextUrl;
  const authRoutes = pathname.startsWith("/auth");
  const dashboardRoutes = pathname.startsWith("/dashboard");

  //periksa, jika users sudah login dan ingin mengakses routes register dan login
  if (token) {
    if (authRoutes) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (dashboardRoutes) {
    const verify = await fetch(
      "https://api.alfiagashop.biz.id/api/v1/verify-token",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    if (!verify.ok) {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
      response.cookies.delete("token");
      return response;
    }
  }
  //periksa jika users belom login dan ingin mengakses dashboard
  if (!token) {
    if (dashboardRoutes) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  //jika yang login admin maka izinkan semua rute dashboard
  if (roles === "admin") {
    return NextResponse.next();
  }

  if (
    roles === "siswa" &&
    pathname.startsWith(
      "/dashboard/admin" || pathname.startsWith("/dashboard/admin-pembimbing")
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (
    roles === "guru-pembimbing" &&
    pathname.startsWith("/dashboard/admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard"), request.url);
  }

  return NextResponse.next();
}

//pilih route mana yang mau di jalankkan middelwaerenya
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
