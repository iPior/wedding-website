"use client";

import { useState } from "react";
import {
  submitRsvp,
  modifyRsvp,
  type HouseholdData,
  type SubmitRsvpInput,
  type RsvpResult,
} from "@/actions/rsvp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

type GuestFormData = {
  id: string;
  firstName: string;
  lastName: string;
  attending: "YES" | "NO" | "";
  dietaryRestrictions: string;
  songRequest: string;
};

type PlusOneFormData = {
  firstName: string;
  lastName: string;
  dietaryRestrictions: string;
};

type Props = {
  household: HouseholdData;
  modifyToken?: string;
  onSuccess: () => void;
};

export function RsvpForm({ household, modifyToken, onSuccess }: Props) {
  const primaryGuest = household.guests.find((g) => g.isPrimary);

  const [email, setEmail] = useState(primaryGuest?.email ?? "");
  const [guests, setGuests] = useState<GuestFormData[]>(
    household.guests.map((g) => ({
      id: g.id,
      firstName: g.firstName,
      lastName: g.lastName,
      attending: (g.attending === "YES" || g.attending === "NO" ? g.attending : "") as GuestFormData["attending"],
      dietaryRestrictions: g.dietaryRestrictions ?? "",
      songRequest: g.songRequest ?? "",
    }))
  );
  const [plusOnes, setPlusOnes] = useState<PlusOneFormData[]>(
    household.existingPlusOnes.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
      dietaryRestrictions: p.dietaryRestrictions ?? "",
    }))
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateGuest(index: number, field: keyof GuestFormData, value: string) {
    setGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, [field]: value } : g))
    );
  }

  function addPlusOne() {
    if (plusOnes.length >= household.maxPlusOnes) return;
    setPlusOnes((prev) => [
      ...prev,
      { firstName: "", lastName: "", dietaryRestrictions: "" },
    ]);
  }

  function removePlusOne(index: number) {
    setPlusOnes((prev) => prev.filter((_, i) => i !== index));
  }

  function updatePlusOne(index: number, field: keyof PlusOneFormData, value: string) {
    setPlusOnes((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    for (const guest of guests) {
      if (!guest.attending) {
        setError(`Please select attending status for ${guest.firstName} ${guest.lastName}`);
        return;
      }
    }

    for (let i = 0; i < plusOnes.length; i++) {
      const po = plusOnes[i];
      if (!po.firstName.trim() || !po.lastName.trim()) {
        setError(`Please enter a name for plus-one #${i + 1}`);
        return;
      }
    }

    setLoading(true);

    const input: SubmitRsvpInput = {
      householdId: household.householdId,
      email: email.trim(),
      guests: guests.map((g) => ({
        id: g.id,
        attending: g.attending as "YES" | "NO",
        dietaryRestrictions: g.dietaryRestrictions || undefined,
        songRequest: g.songRequest || undefined,
      })),
      plusOnes: plusOnes
        .filter((p) => p.firstName.trim())
        .map((p) => ({
          firstName: p.firstName.trim(),
          lastName: p.lastName.trim(),
          dietaryRestrictions: p.dietaryRestrictions || undefined,
        })),
    };

    let result: RsvpResult;
    if (modifyToken) {
      result = await modifyRsvp({ ...input, token: modifyToken });
    } else {
      result = await submitRsvp(input);
    }

    setLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{household.householdName}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {modifyToken ? "Update your RSVP below." : "Please respond for each guest in your household."}
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Your Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <p className="text-xs text-muted-foreground">
          We&apos;ll send a confirmation with a link to modify your RSVP.
        </p>
      </div>

      <Separator />

      {/* Guests */}
      {guests.map((guest, index) => (
        <div key={guest.id} className="space-y-4 rounded-lg border p-4">
          <h3 className="font-medium">
            {guest.firstName} {guest.lastName}
            {household.guests[index]?.isPrimary && (
              <span className="ml-2 text-xs text-muted-foreground">(Primary)</span>
            )}
          </h3>

          <div className="space-y-2">
            <Label>Will you be attending?</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={guest.attending === "YES" ? "default" : "outline"}
                size="sm"
                onClick={() => updateGuest(index, "attending", "YES")}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={guest.attending === "NO" ? "default" : "outline"}
                size="sm"
                onClick={() => updateGuest(index, "attending", "NO")}
              >
                No
              </Button>
            </div>
          </div>

          {guest.attending === "YES" && (
            <div className="space-y-2">
              <Label>Dietary Restrictions</Label>
              <Textarea
                value={guest.dietaryRestrictions}
                onChange={(e) => updateGuest(index, "dietaryRestrictions", e.target.value)}
                placeholder="Any allergies or dietary restrictions..."
                rows={2}
              />
            </div>
          )}

          {household.guests[index]?.isPrimary && (
            <div className="space-y-2">
              <Label>Song Request (optional)</Label>
              <Input
                value={guest.songRequest}
                onChange={(e) => updateGuest(index, "songRequest", e.target.value)}
                placeholder="What song gets you on the dance floor?"
              />
            </div>
          )}
        </div>
      ))}

      {/* Plus-Ones */}
      {household.maxPlusOnes > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Plus Ones</h3>
                <p className="text-xs text-muted-foreground">
                  You may bring up to {household.maxPlusOnes} additional guest(s).
                </p>
              </div>
              {plusOnes.length < household.maxPlusOnes && (
                <Button type="button" variant="outline" size="sm" onClick={addPlusOne}>
                  + Add Guest
                </Button>
              )}
            </div>

            {plusOnes.map((po, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Plus One #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => removePlusOne(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>First Name</Label>
                    <Input
                      value={po.firstName}
                      onChange={(e) => updatePlusOne(index, "firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Last Name</Label>
                    <Input
                      value={po.lastName}
                      onChange={(e) => updatePlusOne(index, "lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dietary Restrictions</Label>
                  <Textarea
                    value={po.dietaryRestrictions}
                    onChange={(e) => updatePlusOne(index, "dietaryRestrictions", e.target.value)}
                    placeholder="Any allergies or dietary restrictions..."
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? "Submitting..."
          : modifyToken
            ? "Update RSVP"
            : "Submit RSVP"}
      </Button>
    </form>
  );
}
