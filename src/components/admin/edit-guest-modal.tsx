"use client";

import { useState, useTransition } from "react";
import { PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateGuest, deleteGuest, updateHousehold, deleteHousehold } from "@/actions/guests";

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  isPrimary: boolean;
  attending: "YES" | "NO" | "PENDING" | null;
  dietaryRestrictions: string | null;
};

export function EditGuestButton({ guest }: { guest: Guest }) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, startSave] = useTransition();
  const [deleting, startDelete] = useTransition();

  function handleSave(formData: FormData) {
    startSave(async () => {
      const result = await updateGuest(guest.id, formData);
      if (result.success) setOpen(false);
    });
  }

  function handleDelete() {
    startDelete(async () => {
      await deleteGuest(guest.id);
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); setConfirmDelete(false); }}>
      <DialogTrigger asChild>
        <button
          className="text-muted-foreground/50 transition-colors hover:text-primary"
          aria-label="Edit guest"
        >
          <PencilIcon size={13} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle
            className="text-xl text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Edit Guest
          </DialogTitle>
        </DialogHeader>

        <form action={handleSave} className="space-y-4 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                First Name
              </Label>
              <Input name="firstName" defaultValue={guest.firstName} required />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Last Name
              </Label>
              <Input name="lastName" defaultValue={guest.lastName} required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </Label>
            <Input name="email" type="email" defaultValue={guest.email ?? ""} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                RSVP Status
              </Label>
              <select
                name="attending"
                defaultValue={guest.attending ?? "PENDING"}
                className="w-full border border-input bg-background px-3 py-2 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="PENDING">Pending</option>
                <option value="YES">Attending</option>
                <option value="NO">Declined</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Primary Guest
              </Label>
              <select
                name="isPrimary"
                defaultValue={guest.isPrimary ? "true" : "false"}
                className="w-full border border-input bg-background px-3 py-2 text-sm text-primary focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Dietary Restrictions
            </Label>
            <Input
              name="dietaryRestrictions"
              defaultValue={guest.dietaryRestrictions ?? ""}
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary px-6 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Destructive zone */}
        <div className="border-t border-border pt-4 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Danger Zone
          </p>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs uppercase tracking-[0.15em] text-muted-foreground/50 transition-colors hover:text-destructive"
            >
              Delete Guest
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                This will permanently delete{" "}
                <span className="text-primary">
                  {guest.firstName} {guest.lastName}
                </span>
                . If they are the last guest in the household, the household will also be removed.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-xs uppercase tracking-[0.15em] text-destructive transition-opacity hover:opacity-70 disabled:opacity-50"
                >
                  {deleting ? "Deleting…" : "Confirm Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------

type Household = {
  id: string;
  name: string;
  maxPlusOnes: number;
};

export function EditHouseholdButton({ household }: { household: Household }) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, startSave] = useTransition();
  const [deleting, startDelete] = useTransition();

  function handleSave(formData: FormData) {
    startSave(async () => {
      const result = await updateHousehold(household.id, formData);
      if (result.success) setOpen(false);
    });
  }

  function handleDelete() {
    startDelete(async () => {
      await deleteHousehold(household.id);
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); setConfirmDelete(false); }}>
      <DialogTrigger asChild>
        <button
          className="text-muted-foreground/50 transition-colors hover:text-primary"
          aria-label="Edit household"
        >
          <PencilIcon size={13} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle
            className="text-xl text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Edit Household
          </DialogTitle>
        </DialogHeader>

        <form action={handleSave} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Household Name
            </Label>
            <Input name="name" defaultValue={household.name} required />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Max Plus Ones
            </Label>
            <Input
              name="maxPlusOnes"
              type="number"
              min={0}
              defaultValue={household.maxPlusOnes}
              required
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary px-6 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Destructive zone */}
        <div className="border-t border-border pt-4 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Danger Zone
          </p>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="text-xs uppercase tracking-[0.15em] text-muted-foreground/50 transition-colors hover:text-destructive"
            >
              Delete Household
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                This will permanently delete{" "}
                <span className="text-primary">{household.name}</span> and all
                guests within it.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="text-xs uppercase tracking-[0.15em] text-destructive transition-opacity hover:opacity-70 disabled:opacity-50"
                >
                  {deleting ? "Deleting…" : "Confirm Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
