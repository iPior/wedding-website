"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { HouseholdData } from "@/actions/rsvp";
import { GuestSearch } from "./guest-search";
import { RsvpForm } from "./rsvp-form";

type Step = "search" | "form" | "confirmed";

export function RsvpFlow() {
  const tConf = useTranslations("RsvpConfirmation");
  const [step, setStep] = useState<Step>("search");
  const [household, setHousehold] = useState<HouseholdData | null>(null);

  function handleHouseholdFound(data: HouseholdData) {
    setHousehold(data);
    setStep("form");
  }

  function handleSuccess() {
    setStep("confirmed");
  }

  function handleBack() {
    setStep("search");
    setHousehold(null);
  }

  if (step === "search") {
    return <GuestSearch onHouseholdFound={handleHouseholdFound} />;
  }

  if (step === "form" && household) {
    return (
      <div className="space-y-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-primary)]"
        >
          <span aria-hidden="true">&larr;</span>
          {tConf("backToSearch")}
        </button>
        <RsvpForm household={household} onSuccess={handleSuccess} />
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="py-8 text-center">
        <p className="text-[var(--color-accent)] text-3xl mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
          &amp;
        </p>
        <h2
          className="text-4xl text-[var(--color-primary)] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {tConf("thankYou")}
        </h2>
        <div className="mx-auto my-6 h-px w-16 bg-[var(--color-border)]" />
        <p className="text-sm leading-relaxed text-[var(--color-foreground-soft)] max-w-md mx-auto">
          {tConf("submitted")}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
          {tConf("excited")}
        </p>
      </div>
    );
  }

  return null;
}
