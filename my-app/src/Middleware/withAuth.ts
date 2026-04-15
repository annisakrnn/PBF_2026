import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const hanyaAdmin = ["/admin"];

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
        const Url = new URL("/auth/login", req.url);
        
        // Simpan halaman tujuan di parameter callbackUrl agar setelah login otomatis balik ke sini
        Url.searchParams.set("callbackUrl", encodeURI(req.url));
        
        return NextResponse.redirect(Url);
      }
      if (token.role !== "admin" && hanyaAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // 3. Lanjutkan ke middleware berikutnya jika lolos pengecekan
    return middleware(req, next);
  };
}