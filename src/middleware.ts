import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Public paths (accessible without login)
  const publicPaths = [
    "/login",
    "/signup",
    "/verifyemail",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  // If user is logged in and tries to access a public path, redirect home
  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Protected paths (require login)
  const protectedPaths = ["/", "/profile"];

  if (protectedPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Allow access otherwise
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/auth/forgot-password",
    "/auth/reset-password",
  ],
};
