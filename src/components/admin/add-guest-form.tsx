"use client";

import { useState } from "react";
import { addGuest } from "@/actions/guests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddGuestForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        + Add Guest
      </Button>
    );
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await addGuest(formData);
    if (result.success) {
      setOpen(false);
    } else {
      setError(result.error ?? "Failed to add guest");
    }
  }

  return (
    <form action={handleSubmit} className="rounded-md border p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="householdName">Household Name</Label>
          <Input id="householdName" name="householdName" required placeholder="The Smith Family" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="maxPlusOnes">Max Plus Ones</Label>
          <Input id="maxPlusOnes" name="maxPlusOnes" type="number" defaultValue="0" min="0" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isPrimary" value="true" />
            Primary contact
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" size="sm">Add</Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
