import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtected = path.includes("/dashboard");

  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/dashboard/playground", req.url));
  }
  return NextResponse.next();
}
