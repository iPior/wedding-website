"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { setLocale } from "@/actions/locale";
import { weddingConfig } from "../../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

export function Nav() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/our-story", label: t("ourStory") },
    { href: "/details", label: t("details") },
    { href: "/faq", label: t("faq") },
    { href: "/bridal-party", label: t("party") },
  ];

  const mobileLinkTypography =
    locale === "pl"
      ? "text-[1.35rem] tracking-[0.16em] leading-[1.25]"
      : "text-2xl tracking-[0.3em]";

  const desktopLinkTypography =
    locale === "pl" ? "text-[0.7rem] tracking-[0.2em]" : "text-xs tracking-[0.3em]";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  async function handleSwitchLocale(newLocale: "en" | "pl") {
    if (newLocale === locale) return;
    await setLocale(newLocale);
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <>
      <nav className="relative z-50">
        <div className="flex items-center justify-between px-6 md:px-16 py-10">
          {/* Couple names */}
          <Link
            href="/"
            className="text-sm tracking-[0.5em] uppercase text-primary"
            style={{ fontVariant: "small-caps" }}
            onClick={() => setOpen(false)}
          >
            <span
              className="lg:hidden text-lg text-muted-foreground"
              style={{ fontFamily: "var(--font-playfair), serif", fontVariant: "normal" }}
            >
              {person1.firstName[0]}&amp;{person2.firstName[0]}
            </span>
            <span className="hidden lg:inline">
              {person1.firstName} & {person2.firstName}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-12">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative uppercase transition-colors duration-300 hover:text-primary ${desktopLinkTypography} ${
                  isActive(l.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute -bottom-1 left-0 right-[0.3em] h-px bg-accent" />
                )}
              </Link>
            ))}
            <Link
              href="/rsvp"
              className={`uppercase text-background bg-primary px-5 py-2.5 transition-colors duration-300 hover:bg-accent ${desktopLinkTypography}`}
            >
              {t("rsvp")}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-primary z-50 relative"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-background transition-transform duration-500 ease-in-out lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-10">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`relative max-w-[86vw] px-2 text-center whitespace-normal break-words uppercase transition-colors duration-300 hover:text-primary ${mobileLinkTypography} ${
                isActive(l.href) ? "text-primary" : "text-muted-foreground"
              }`}
              style={{
                transitionDelay: open ? `${i * 60 + 150}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(-16px)",
                opacity: open ? 1 : 0,
                transition: open
                  ? `transform 0.45s ease ${i * 60 + 150}ms, opacity 0.45s ease ${i * 60 + 150}ms, color 0.3s`
                  : "transform 0s, opacity 0s",
              }}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="block mt-1 mr-[0.3em] h-[1.5px] bg-accent" />
              )}
            </Link>
          ))}
          <Link
            href="/rsvp"
            onClick={() => setOpen(false)}
            className="mt-4 text-sm tracking-[0.3em] uppercase text-background bg-primary px-12 py-4 transition-colors duration-300 hover:bg-accent"
            style={{
              transitionDelay: open ? `${links.length * 60 + 150}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(-16px)",
              opacity: open ? 1 : 0,
              transition: open
                ? `transform 0.45s ease ${links.length * 60 + 150}ms, opacity 0.45s ease ${links.length * 60 + 150}ms, color 0.3s`
                : "transform 0s, opacity 0s",
            }}
          >
            {t("rsvp")}
          </Link>
          <div
            className="mt-4 flex items-center gap-4"
            style={{
              transitionDelay: open ? `${(links.length + 1) * 60 + 150}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(-16px)",
              opacity: open ? 1 : 0,
              transition: open
                ? `transform 0.45s ease ${(links.length + 1) * 60 + 150}ms, opacity 0.45s ease ${(links.length + 1) * 60 + 150}ms, color 0.3s`
                : "transform 0s, opacity 0s",
            }}
          >
            <button
              onClick={() => handleSwitchLocale("en")}
              className={`text-sm tracking-[0.3em] uppercase transition-colors duration-300 cursor-pointer ${
                locale === "en"
                  ? "text-nav-highlight font-semibold"
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              EN
            </button>
            <span className="text-muted-foreground/30 text-sm">|</span>
            <button
              onClick={() => handleSwitchLocale("pl")}
              className={`text-sm tracking-[0.3em] uppercase transition-colors duration-300 cursor-pointer ${
                locale === "pl"
                  ? "text-nav-highlight font-semibold"
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              PL
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <style>{`body { overflow: hidden; }`}</style>
      )}
    </>
  );
}
