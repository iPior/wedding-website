"use server";

import { cookies } from "next/headers";
import { normalizeLocale } from "@/lib/locale";

export async function setLocale(locale: string) {
  const validLocale = normalizeLocale(locale);
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", validLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
