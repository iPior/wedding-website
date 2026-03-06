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
      <DialogContent className="max-w-sm bg-[var(--color-background)] border-[var(--color-border)] [&>button]:hidden">
        <DialogHeader className="text-center">
          <DialogTitle
            className="text-3xl text-[var(--color-primary)] text-center"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-[var(--color-muted-foreground)] text-center">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => handleSelect("en")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
          >
            {t("english")}
          </button>
          <button
            onClick={() => handleSelect("pl")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-[var(--color-input)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-border)]"
          >
            {t("polish")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
