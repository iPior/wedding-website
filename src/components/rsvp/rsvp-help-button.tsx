"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function RsvpHelpButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Rsvp");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white text-primary border border-accent px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.18em] shadow-md transition-colors hover:bg-accent/10"
      >
        {t("helpButton")}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm bg-background border-border" aria-describedby="rsvp-help-desc">
          <DialogTitle
            className="text-xl text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("helpTitle")}
          </DialogTitle>
          <p id="rsvp-help-desc" className="text-sm leading-relaxed text-foreground-soft">
            {t("issuesHelp")}
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
