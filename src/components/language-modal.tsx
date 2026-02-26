"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { setLocale } from "@/actions/locale";

export function LanguageModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageModal");

  useEffect(() => {
    const hasLocale = document.cookie
      .split("; ")
      .some((c) => c.startsWith("NEXT_LOCALE="));
    if (!hasLocale) {
      setOpen(true);
    }
  }, []);

  async function handleSelect(locale: "en" | "pl") {
    await setLocale(locale);
    setOpen(false);
    router.replace(pathname, { locale });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm bg-[#fff8f8] border-[#f0e0e4] [&>button]:hidden">
        <DialogHeader className="text-center">
          <DialogTitle
            className="text-3xl text-[#2c2424] text-center"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-[#8a7f7f] text-center">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => handleSelect("en")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-[#2c2424] bg-[#2c2424] text-white transition-colors hover:bg-[#d4a0b0] hover:border-[#d4a0b0]"
          >
            {t("english")}
          </button>
          <button
            onClick={() => handleSelect("pl")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-[#c8b0b4] text-[#2c2424] transition-colors hover:bg-[#f0e0e4]"
          >
            {t("polish")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
