"use client";

import { useState } from "react";
import type { HouseholdData } from "@/actions/rsvp";
import { GuestSearch } from "./guest-search";
import { RsvpForm } from "./rsvp-form";

type Step = "search" | "form" | "confirmed";

export function RsvpFlow() {
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
      <div className="space-y-4">
        <button
          onClick={handleBack}
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          &larr; Back to search
        </button>
        <RsvpForm household={household} onSuccess={handleSuccess} />
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold">Thank You!</h2>
        <p className="text-muted-foreground">
          Your RSVP has been submitted. You&apos;ll receive a confirmation email
          with a link to modify your response if needed.
        </p>
        <p className="text-sm text-muted-foreground">
          We are excited to celebrate with you!
        </p>
      </div>
    );
  }

  return null;
}
