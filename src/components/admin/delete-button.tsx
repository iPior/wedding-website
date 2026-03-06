"use client";

import { deleteGuest, deleteHousehold } from "@/actions/guests";

export function DeleteGuestButton({ guestId }: { guestId: string }) {
  async function handleDelete() {
    if (!confirm("Delete this guest?")) return;
    await deleteGuest(guestId);
  }

  return (
    <button
      onClick={handleDelete}
      className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]/50 transition-colors hover:text-destructive"
    >
      Delete
    </button>
  );
}

export function DeleteHouseholdButton({ householdId }: { householdId: string }) {
  async function handleDelete() {
    if (!confirm("Delete this entire household and all its guests?")) return;
    await deleteHousehold(householdId);
  }

  return (
    <button
      onClick={handleDelete}
      className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]/50 transition-colors hover:text-destructive whitespace-nowrap"
    >
      Delete
    </button>
  );
}
