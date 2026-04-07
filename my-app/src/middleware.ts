import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("isLogin")?.value;

  const pathname = request.nextUrl.pathname;

  // daftar route yang ingin diproteksi
  const protectedRoutes = ["/produk", "/about"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // belum login + akses route protected
  if (isProtected && isLogin !== "true") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // selain itu, lanjut
  return NextResponse.next();
}