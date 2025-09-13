import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublicPath = pathname === "/login" || pathname === "/signup";

  // If user has token and is trying to access login/signup, redirect home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Protected paths (require login)
  const isProtectedPath = pathname === "/" || pathname === "/profile";

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Allow access to /verifyemail without login
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
