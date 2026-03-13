"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { HouseholdData } from "@/actions/rsvp";
import { GuestSearch } from "./guest-search";
import { RsvpForm } from "./rsvp-form";

export function RsvpFlow() {
  const tConf = useTranslations("RsvpConfirmation");
  const router = useRouter();
  const [household, setHousehold] = useState<HouseholdData | null>(null);

  function handleHouseholdFound(data: HouseholdData) {
    setHousehold(data);
  }

  function handleSuccess(anyAttending: boolean) {
    router.push(`/rsvp/confirmed?attending=${anyAttending}`);
  }

  function handleBack() {
    setHousehold(null);
  }

  if (!household) {
    return <GuestSearch onHouseholdFound={handleHouseholdFound} />;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
      >
        <span aria-hidden="true">&larr;</span>
        {tConf("backToSearch")}
      </button>
      <RsvpForm household={household} onSuccess={handleSuccess} />
    </div>
  );
}
