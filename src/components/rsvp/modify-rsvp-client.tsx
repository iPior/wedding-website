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
        <p className="text-[#d4a0b0] text-3xl mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
          &amp;
        </p>
        <h2
          className="text-4xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("updatedTitle")}
        </h2>
        <div className="mx-auto my-6 h-px w-16 bg-[#f0e0e4]" />
        <p className="text-sm leading-relaxed text-[#5a4f4f] max-w-md mx-auto">
          {t("updatedMessage")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-4xl text-[#2c2424] mb-3"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("title")}
        </h1>
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
          {t("subtitle")}
        </p>
      </div>
      <div className="h-px bg-[#f0e0e4]" />
      <RsvpForm
        household={household}
        modifyToken={token}
        onSuccess={() => setConfirmed(true)}
      />
    </div>
  );
}
