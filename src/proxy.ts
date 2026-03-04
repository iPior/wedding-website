import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { SITE_ACCESS_COOKIE, SITE_ACCESS_COOKIE_VALUE } from "@/lib/auth";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ["/", "/our-story", "/details", "/faq", "/bridal-party", "/rsvp"];

function isProtectedPath(pathnameWithoutLocale: string): boolean {
  // Exempt /rsvp/modify/* from password gate
  if (pathnameWithoutLocale.startsWith("/rsvp/modify/")) {
    return false;
  }

  return PROTECTED_PATHS.some((route) =>
    route === "/"
      ? pathnameWithoutLocale === "/"
      : pathnameWithoutLocale.startsWith(route),
  );
}

function stripLocalePrefix(pathname: string): string {
  for (const locale of routing.locales) {
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length) || "/";
    }
  }
  return pathname;
}

export default function middleware(request: NextRequest) {
  // Let next-intl handle locale routing first
  const response = intlMiddleware(request);

  // Determine the locale-less path for password gate check
  const pathnameWithoutLocale = stripLocalePrefix(request.nextUrl.pathname);

  if (!isProtectedPath(pathnameWithoutLocale)) {
    return response;
  }

  // Check password gate
  const hasAccess =
    request.cookies.get(SITE_ACCESS_COOKIE)?.value === SITE_ACCESS_COOKIE_VALUE;

  if (hasAccess) {
    return response;
  }

  // Determine locale from the URL or fallback
  const locale =
    routing.locales.find((l) =>
      request.nextUrl.pathname.startsWith(`/${l}`),
    ) ?? routing.defaultLocale;

  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const passwordUrl = new URL(`${prefix}/password`, request.url);
  return NextResponse.redirect(passwordUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files, _next, admin, auth, and Sentry tunnel route
    "/((?!_next|admin|auth|api|monitoring|favicon.ico|.*\\..*).*)",
  ],
};
