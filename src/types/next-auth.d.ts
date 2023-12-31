// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth/next";
import { type User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      name: string;
      email: string;
      image: string;
      accessToken: string;
    };
  }
}
