import { defineRouting } from "next-intl/routing";
import { weddingConfig } from "../../wedding.config";

export const routing = defineRouting({
  locales: weddingConfig.locales,
  defaultLocale: weddingConfig.defaultLocale,
  localePrefix: "as-needed",
});
