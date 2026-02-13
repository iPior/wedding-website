import { NextRequest, NextResponse } from "next/server";
import {
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_COOKIE_VALUE,
  SITE_ACCESS_MAX_AGE_SECONDS,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const enteredPassword = String(formData.get("password") ?? "").trim();
  const configuredPassword = process.env.SITE_PASSWORD;

  if (!configuredPassword) {
    return NextResponse.redirect(new URL("/password?error=misconfigured", request.url));
  }

  if (!enteredPassword || enteredPassword !== configuredPassword) {
    return NextResponse.redirect(new URL("/password?error=invalid", request.url));
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set({
    name: SITE_ACCESS_COOKIE,
    value: SITE_ACCESS_COOKIE_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SITE_ACCESS_MAX_AGE_SECONDS,
  });

  return response;
}
