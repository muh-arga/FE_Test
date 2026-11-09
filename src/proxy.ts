import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_REDIRECT_PATH, SESSION_COOKIE } from "@/lib/auth/constants";
import { getSessionSecret } from "@/lib/auth/session-secret";
import { verifySignedToken } from "@/lib/auth/signed-token";
import { isTokenExpired } from "@/lib/auth/token";

export async function proxy(request: NextRequest) {
  const cookieValue = request.cookies.get(SESSION_COOKIE)?.value;
  const token = cookieValue ? await verifySignedToken(cookieValue, getSessionSecret()) : null;
  const isLoggedIn = token !== null && !isTokenExpired(token);
  const { pathname, search } = request.nextUrl;
  const isLoginPage = pathname === "/login";

  if (!isLoggedIn && !isLoginPage) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", `${pathname}${search}`);
    const response = NextResponse.redirect(loginUrl);
    if (cookieValue) response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|ico|webp)$).*)"],
};
