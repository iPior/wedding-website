"use client";

import { useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { setLocale } from "@/actions/locale";

function shouldShowModal() {
  if (typeof document === "undefined") return false;
  return !document.cookie.split("; ").some((c) => c.startsWith("NEXT_LOCALE="));
}

export function LanguageModal() {
  const [open, setOpen] = useState(shouldShowModal);
  const router = useRouter();
  const pathname = usePathname();
  async function handleSelect(locale: "en" | "pl") {
    await setLocale(locale);
    setOpen(false);
    router.replace(pathname, { locale });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm bg-background border-border [&>button]:hidden" aria-describedby={undefined}>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleSelect("en")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-primary bg-primary text-primary-foreground transition-colors hover:bg-accent hover:border-accent"
          >
            English Website
          </button>
          <button
            onClick={() => handleSelect("pl")}
            className="w-full py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border border-input text-primary transition-colors hover:bg-border"
          >
            Polska Strona
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
