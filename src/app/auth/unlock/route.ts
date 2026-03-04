import { NextRequest, NextResponse } from "next/server";
import {
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_COOKIE_VALUE,
  SITE_ACCESS_MAX_AGE_SECONDS,
} from "@/lib/auth";
import { logger } from "@/lib/logger";

function getLocalePrefix(request: NextRequest): string {
  const locale = request.cookies.get("NEXT_LOCALE")?.value;
  return locale === "pl" ? "/pl" : "";
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const formData = await request.formData();
  const enteredPassword = String(formData.get("password") ?? "").trim();
  const configuredPassword = process.env.SITE_PASSWORD;
  const prefix = getLocalePrefix(request);
  const requestContext = {
    requestId,
    path: request.nextUrl.pathname,
    ip: request.headers.get("x-forwarded-for") ?? null,
    userAgent: request.headers.get("user-agent") ?? null,
  };

  if (!configuredPassword) {
    logger.error("auth.unlock.misconfigured", requestContext);
    return NextResponse.redirect(
      new URL(`${prefix}/password?error=misconfigured`, request.url),
      303,
    );
  }

  if (!enteredPassword || enteredPassword !== configuredPassword) {
    logger.warn("auth.unlock.invalid_password", requestContext);
    return NextResponse.redirect(
      new URL(`${prefix}/password?error=invalid`, request.url),
      303,
    );
  }

  const response = NextResponse.redirect(new URL(`${prefix}/`, request.url), 303);
  response.cookies.set({
    name: SITE_ACCESS_COOKIE,
    value: SITE_ACCESS_COOKIE_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SITE_ACCESS_MAX_AGE_SECONDS,
  });

  logger.info("auth.unlock.success", requestContext);

  return response;
}
