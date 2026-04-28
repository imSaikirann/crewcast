import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let token = null;

  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,

  
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
    });
  } catch (e) {
    console.log("JWT ERROR:", e);
  }

  const isLoggedIn = !!token;


  console.log("PATH:", pathname);
  console.log("TOKEN EXISTS:", isLoggedIn);

  const DASHBOARD = "/dashboard";
  const LOGIN = "/login";

 
  if (pathname.startsWith(LOGIN) && isLoggedIn) {
    return NextResponse.redirect(new URL(DASHBOARD, req.url));
  }

  if (pathname.startsWith(DASHBOARD) && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN;
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
