"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { HouseholdData } from "@/actions/rsvp";
import { RsvpForm } from "./rsvp-form";

type Props = {
  household: HouseholdData;
  token: string;
};

export function ModifyRsvpClient({ household, token }: Props) {
  const t = useTranslations("ModifyRsvp");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="py-8 text-center">
        <p className="text-[var(--color-accent)] text-3xl mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
          &amp;
        </p>
        <h2
          className="text-4xl text-[var(--color-primary)] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("updatedTitle")}
        </h2>
        <div className="mx-auto my-6 h-px w-16 bg-[var(--color-border)]" />
        <p className="text-sm leading-relaxed text-[var(--color-foreground-soft)] max-w-md mx-auto">
          {t("updatedMessage")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-4xl text-[var(--color-primary)] mb-3"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("title")}
        </h1>
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
          {t("subtitle")}
        </p>
      </div>
      <div className="h-px bg-[var(--color-border)]" />
      <RsvpForm
        household={household}
        modifyToken={token}
        onSuccess={() => setConfirmed(true)}
      />
    </div>
  );
}
