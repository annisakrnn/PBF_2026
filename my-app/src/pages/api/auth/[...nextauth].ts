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
        const user = {
          id: "1",
          fullname: credentials?.fullname,
          email: credentials?.email,
        };

        if (user.email && user.fullname) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Simpan data dari objek 'user' ke dalam 'token' saat pertama kali login
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        // Gunakan type casting (as any) jika fullname belum terdefinisi di type bawaan
        token.fullname = (user as any).fullname;
      }
      return token;
    },
    async session({ session, token }) {
      // Pindahkan data dari 'token' ke dalam objek 'session' agar bisa diakses di frontend
      if (session.user) {
        session.user.email = token.email;
        (session.user as any).fullname = token.fullname;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);