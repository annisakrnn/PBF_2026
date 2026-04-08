import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Logika verifikasi user
        const user = {
          id: "1",
          fullname: credentials?.fullname,
          email: credentials?.email,
          // Jangan kirim password ke dalam session/token demi keamanan
        };

        if (user.email && user.fullname) {
          return user;
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Jika login berhasil, data user dipindah ke token
      if (user) {
        token.email = user.email;
        token.fullname = (user as any).fullname;
      }
      return token;
    },
    async session({ session, token }) {
      // Memindahkan data dari token ke session agar bisa diakses di frontend (useSession)
      if (session.user) {
        session.user.email = token.email;
        (session.user as any).fullname = token.fullname;
      }
      return session;
    },
  },
  // Menambahkan halaman kustom jika Anda memilikinya (opsional)
  pages: {
    signIn: "/auth/login", // Pastikan path ini sesuai jika pakai custom login
  },
};

export default NextAuth(authOptions);