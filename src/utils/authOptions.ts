import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        if (
          credentials?.email === "bhsk@automl.app" &&
          credentials?.password === "rahasia123"
        ) {
          return {
            id: "1",
            email: "bhsk@automl.com",
            name: "Muhammad Bhaska",
            image: "https://github.com/mhmdbhsk.png",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
};
