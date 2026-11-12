import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const { pathname, search } = request.nextUrl;

  if (
    (pathname === "/my-profile" && !user) ||
    (pathname.startsWith("/books/") && !user) ||
    (pathname.startsWith("/add-book") && !user) ||
    (pathname.startsWith("/my-borrows") && !user) ||
    (pathname.startsWith("/my-books") && !user)
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/register") && user) {
    return NextResponse.redirect(new URL("/my-profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-profile",
    "/login",
    "/register",
    "/add-book",
    "/books/:path*",
    "/my-borrows/:path*",
    "/my-books/:path*",
  ],
};
