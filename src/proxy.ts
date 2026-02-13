import { NextRequest, NextResponse } from "next/server";
import { SITE_ACCESS_COOKIE, SITE_ACCESS_COOKIE_VALUE } from "@/lib/auth";

const PROTECTED_ROUTES = ["/", "/rsvp", "/faq", "/bridal-party"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/rsvp/modify/")) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasAccess =
    request.cookies.get(SITE_ACCESS_COOKIE)?.value === SITE_ACCESS_COOKIE_VALUE;
  if (hasAccess) {
    return NextResponse.next();
  }

  const passwordUrl = new URL("/password", request.url);
  return NextResponse.redirect(passwordUrl);
}

export const config = {
  matcher: ["/", "/rsvp/:path*", "/faq/:path*", "/bridal-party/:path*"],
};
