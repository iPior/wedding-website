"use client";

import { useState } from "react";
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

function shouldShowModal() {
  if (typeof document === "undefined") return false;
  return !document.cookie.split("; ").some((c) => c.startsWith("NEXT_LOCALE="));
}

export function LanguageModal() {
  const [open, setOpen] = useState(shouldShowModal);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageModal");

  async function handleSelect(locale: "en" | "pl") {
    await setLocale(locale);
    setOpen(false);
    router.replace(pathname, { locale });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm bg-background border-border [&>button]:hidden">
        <DialogHeader className="text-center">
          <DialogTitle
            className="text-3xl text-primary text-center"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => handleSelect("en")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-primary bg-primary text-primary-foreground transition-colors hover:bg-accent hover:border-accent"
          >
            {t("english")}
          </button>
          <button
            onClick={() => handleSelect("pl")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-input text-primary transition-colors hover:bg-border"
          >
            {t("polish")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
