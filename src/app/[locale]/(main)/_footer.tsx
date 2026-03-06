"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { setLocale } from "@/actions/locale";
import { weddingConfig } from "../../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

export function Footer() {
  const locale = useLocale();
  const tVenue = useTranslations("Venues");
  const pathname = usePathname();
  const router = useRouter();

  const weddingDate = new Date(weddingConfig.date);
  const formattedDate = weddingDate.toLocaleDateString(
    locale === "pl" ? "pl-PL" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
  const ceremonyName = tVenue("ceremonyName");

  async function handleSwitchLocale(newLocale: "en" | "pl") {
    if (newLocale === locale) return;
    await setLocale(newLocale);
    router.replace(pathname, { locale: newLocale });
  }

  const languageToggle = (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleSwitchLocale("en")}
        className={`text-xs tracking-[0.3em] uppercase transition-colors duration-300 cursor-pointer ${
          locale === "en"
            ? "text-nav-highlight"
            : "text-muted-foreground/50 hover:text-muted-foreground"
        }`}
      >
        EN
      </button>
      <span className="text-muted-foreground/30 text-xs">|</span>
      <button
        onClick={() => handleSwitchLocale("pl")}
        className={`text-xs tracking-[0.3em] uppercase transition-colors duration-300 cursor-pointer ${
          locale === "pl"
            ? "text-nav-highlight"
            : "text-muted-foreground/50 hover:text-muted-foreground"
        }`}
      >
        PL
      </button>
    </div>
  );

  return (
    <footer className="bg-primary mt-24">
      {/* Mobile: centered stack */}
      <div className="md:hidden max-w-7xl mx-auto px-6 py-12 flex flex-col items-center gap-4 text-center">
        <span
          className="text-2xl text-nav-highlight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {person1.firstName.charAt(0)}&nbsp;&&nbsp;
          {person2.firstName.charAt(0)}
        </span>
        <span className="text-sm tracking-[0.15em] uppercase text-muted-foreground">
          {formattedDate}
        </span>
        <div className="flex flex-col gap-0.5 text-xs tracking-[0.1em] text-muted-foreground/70">
          <span>{ceremonyName}</span>
          <span>{weddingConfig.venue.reception.name}</span>
        </div>
        <div className="w-16 h-px bg-muted-foreground/30 my-2" />
        {languageToggle}
      </div>

      {/* Desktop: three-column spread */}
      <div className="hidden md:grid max-w-7xl mx-auto px-12 py-12 grid-cols-3 items-center">
        {/* Left — venues */}
        <div className="flex flex-col gap-0.5 text-xs tracking-[0.1em] text-muted-foreground/70">
          <span>{ceremonyName}</span>
          <span>{weddingConfig.venue.reception.name}</span>
        </div>

        {/* Center — monogram + date */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span
            className="text-2xl text-nav-highlight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {person1.firstName.charAt(0)}&nbsp;&&nbsp;
            {person2.firstName.charAt(0)}
          </span>
          <span className="text-sm tracking-[0.15em] uppercase text-muted-foreground">
            {formattedDate}
          </span>
        </div>

        {/* Right — language toggle */}
        <div className="flex justify-end">
          {languageToggle}
        </div>
      </div>
    </footer>
  );
}
