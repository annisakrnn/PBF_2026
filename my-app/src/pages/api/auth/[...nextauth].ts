import { signIn, signInWithGoogle } from "@/utils/db/servicefirebase";
import bcrypt from "bcrypt"; // Import bcrypt untuk verifikasi password
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
              image: user.image || null,
            };
          }
        }

        // Jika user tidak ditemukan atau password salah
        return null;
      },
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
],

  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role?.trim();
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        };
        
        await signInWithGoogle(data, (response: any) => {
          if (response.status) {

          
        token.fullname = data.fullname;
        token.email = data.email;
        token.image = data.image;
        token.type = data.type;
        token.role = response.data.role?.trim(); 
      }
        });
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
      if (token.image) {
        session.user.image = token.image;
      }

      if (token.role) {
        session.user.role = token.role?.trim();
      }
      if (token.type) {
        session.user.type = token.type;
      }

      // console.log("session callback", { session, token })
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);