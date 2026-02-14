"use client";

import { deleteGuest, deleteHousehold } from "@/actions/guests";
import { Button } from "@/components/ui/button";

export function DeleteGuestButton({ guestId }: { guestId: string }) {
  async function handleDelete() {
    if (!confirm("Delete this guest?")) return;
    await deleteGuest(guestId);
  }

  return (
    <Button variant="ghost" size="xs" onClick={handleDelete} className="text-destructive hover:text-destructive">
      Delete
    </Button>
  );
}

export function DeleteHouseholdButton({ householdId }: { householdId: string }) {
  async function handleDelete() {
    if (!confirm("Delete this entire household and all its guests?")) return;
    await deleteHousehold(householdId);
  }

  return (
    <Button variant="ghost" size="xs" onClick={handleDelete} className="text-destructive hover:text-destructive">
      Delete Household
    </Button>
  );
}
