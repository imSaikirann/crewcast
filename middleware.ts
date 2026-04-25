// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  let session: Awaited<ReturnType<typeof getToken>> = null;
  try {
    session = await getToken({
      req,
      // Avoid crashing the edge runtime when the secret isn't present (eg preview builds).
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch {
    session = null;
  }

  const { pathname } = req.nextUrl;

  const DASHBOARD = "/dashboard";
  const LOGIN = "/login";

  if (pathname.startsWith(LOGIN) && session) {
    return NextResponse.redirect(new URL(DASHBOARD, req.url));
  }

  if (pathname.startsWith(DASHBOARD) && !session) {
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