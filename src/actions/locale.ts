"use server";

import { cookies } from "next/headers";

export async function setLocale(locale: string) {
  const validLocale = locale === "pl" ? "pl" : "en";
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", validLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
