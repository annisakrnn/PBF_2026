import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";

export function mainMiddleware(request: NextRequest) {
  return NextResponse.next();
}

// Bungkus mainMiddleware dengan withAuth
export default withAuth(mainMiddleware, ["/profile", "/produk", "/about"]);

export const config = {
  matcher: ["/profile", "/produk", "/about"],
};