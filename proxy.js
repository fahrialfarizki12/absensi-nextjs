import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")
  const roles = request.cookies.get("roles")?.value;
console.log(token)

}
