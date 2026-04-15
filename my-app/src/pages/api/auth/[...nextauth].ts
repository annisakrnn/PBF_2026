import { signIn } from "@/utils/db/servicefirebase";
import bcrypt from "bcrypt"; // Import bcrypt untuk verifikasi password
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
        // fullname dikomentari sesuai gambar karena tidak digunakan saat login
        // fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Validasi awal input
        if (!credentials?.email || !credentials?.password) return null;

        // Mencari user di database berdasarkan email
        const user: any = await signIn(credentials.email);

        if (user) {
          // Komparasi password input dengan password terenkripsi di database
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordValid) {
            // Mengembalikan object user yang bersih (tanpa password)
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role,
            };
          }
        }

        // Jika user tidak ditemukan atau password salah
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }

      // console.log("jwt callback", { token, account, profile, user })
      return token;
    },

    async session({ session, token }: any) {
      if (token.email) {
        session.user.email = token.email;
      }

      if (token.fullname) {
        session.user.fullname = token.fullname;
      }

      if (token.role) {
        session.user.role = token.role;
      }

      // console.log("session callback", { session, token })
      return session;
    },
  },
};

export default NextAuth(authOptions);