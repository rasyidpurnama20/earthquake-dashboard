import { authOptions } from "@/utils";
import NextAuth from "next-auth/next";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
