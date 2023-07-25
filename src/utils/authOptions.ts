/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from "@/services";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await authService.login({
          username: credentials?.username as string,
          password: credentials?.password as string,
        });

        const user = res.data;

        if (user) {
          return {
            id: user?.auth_token,
            name: "dummy",
            email: "dummy",
            image: "",
            accessToken: user?.auth_token,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
  },
};
