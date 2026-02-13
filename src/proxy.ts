import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/", "/rsvp", "/faq", "/bridal-party"];
const ACCESS_COOKIE = "site_access";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get(ACCESS_COOKIE)?.value === "granted";
  if (hasAccess) {
    return NextResponse.next();
  }

  const passwordUrl = new URL("/password", request.url);
  return NextResponse.redirect(passwordUrl);
}

export const config = {
  matcher: ["/", "/rsvp/:path*", "/faq/:path*", "/bridal-party/:path*"],
};
