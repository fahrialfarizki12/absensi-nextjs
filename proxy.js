import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")
  const roles = request.cookies.get("roles")

  const isAuthRoute = pathname.startsWith("/auth");

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  return NextResponse.next();
}

