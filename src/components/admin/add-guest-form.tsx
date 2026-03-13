"use client";

import { useState } from "react";
import { addGuest } from "@/actions/guests";

export function AddGuestForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="border border-accent px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        + Add Guest
      </button>
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
    <form action={handleSubmit} className="border border-border bg-card/60 p-5 space-y-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Add Guest</p>
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: "householdName", label: "Household Name", placeholder: "The Smith Family", required: true },
          { id: "maxPlusOnes", label: "Max Plus Ones", type: "number", defaultValue: "0" },
          { id: "firstName", label: "First Name", required: true },
          { id: "lastName", label: "Last Name", required: true },
          { id: "email", label: "Email (optional)", type: "email" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type ?? "text"}
              required={field.required}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              min={field.type === "number" ? "0" : undefined}
              className="mt-1.5 w-full border border-border bg-background px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/40"
            />
          </div>
        ))}

        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground cursor-pointer">
            <input type="checkbox" name="isPrimary" value="true" className="accent-accent" />
            Primary contact
          </label>
        </div>
      </div>

      {error && (
        <p className="text-xs uppercase tracking-[0.15em] text-destructive">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-primary px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-background transition-colors hover:bg-accent"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
