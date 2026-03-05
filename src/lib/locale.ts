import { weddingConfig } from "../../wedding.config";

export const SUPPORTED_LOCALES = weddingConfig.locales;
export const DEFAULT_LOCALE = weddingConfig.defaultLocale;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(locale: string): locale is AppLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

export function normalizeLocale(locale: string | null | undefined): AppLocale {
  if (!locale) return DEFAULT_LOCALE;

  const normalized = locale.toLowerCase();
  const base = normalized.split("-")[0];

  if (isSupportedLocale(base)) {
    return base;
  }

  return DEFAULT_LOCALE;
}

export function localePrefix(locale: AppLocale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function withLocalePath(locale: AppLocale, path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${localePrefix(locale)}${normalizedPath}`;
}
