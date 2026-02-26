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
          className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f] transition-colors hover:text-[#2c2424]"
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
        <p className="text-[#d4a0b0] text-3xl mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
          &amp;
        </p>
        <h2
          className="text-4xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {tConf("thankYou")}
        </h2>
        <div className="mx-auto my-6 h-px w-16 bg-[#f0e0e4]" />
        <p className="text-sm leading-relaxed text-[#5a4f4f] max-w-md mx-auto">
          {tConf("submitted")}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#8a7f7f]">
          {tConf("excited")}
        </p>
      </div>
    );
  }

  return null;
}
