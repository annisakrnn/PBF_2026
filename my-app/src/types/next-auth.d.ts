import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      fullname: string;      
      role?: string;        
      image?: string | null; 
      type?: string;         
    } & DefaultSession["user"];
  }
  interface User {
    role?: "user" | "editor" | "admin";
  }

  interface User {
    id: string;
    fullname: string;
    role: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullname?: string;
    role?: string;
    image?: string | null;
    type?: string;
  }
}