import { getToken } from "next-auth/jwt";
import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // 1. Cek apakah halaman yang diakses ada dalam daftar requireAuth
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      // 2. Jika tidak ada token (belum login), redirect ke halaman login
      if (!token) {
        // Gunakan /auth/login atau /login sesuai struktur folder Anda
        const url = new URL("/auth/login", req.url);
        
        // Simpan halaman tujuan di parameter callbackUrl agar setelah login otomatis balik ke sini
        url.searchParams.set("callbackUrl", req.url);
        
        return NextResponse.redirect(url);
      }
    }

    // 3. Lanjutkan ke middleware berikutnya jika lolos pengecekan
    return middleware(req, next);
  };
}