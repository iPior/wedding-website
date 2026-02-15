"use client";

import { useState } from "react";
import type { HouseholdData } from "@/actions/rsvp";
import { RsvpForm } from "./rsvp-form";

type Props = {
  household: HouseholdData;
  token: string;
};

export function ModifyRsvpClient({ household, token }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold">RSVP Updated</h2>
        <p className="text-muted-foreground">
          Your changes have been saved. You&apos;ll receive an updated
          confirmation email with a new modification link.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Modify RSVP</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your responses below.
        </p>
      </div>
      <RsvpForm
        household={household}
        modifyToken={token}
        onSuccess={() => setConfirmed(true)}
      />
    </div>
  );
}
