"use client";

import { useState } from "react";
import { searchGuests, getHouseholdForRsvp, type SearchResult, type HouseholdData } from "@/actions/rsvp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  onHouseholdFound: (data: HouseholdData) => void;
};

export function GuestSearch({ onHouseholdFound }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingHousehold, setLoadingHousehold] = useState(false);
  const [notPrimaryMessage, setNotPrimaryMessage] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    setLoading(true);
    setResults(null);
    setNotPrimaryMessage(null);

    const result = await searchGuests(firstName.trim(), lastName.trim());
    setResults(result);
    setLoading(false);
  }

  async function handleSelectGuest(guest: SearchResult["guests"][0]) {
    if (!guest.isPrimary) {
      setNotPrimaryMessage(
        guest.primaryGuestName
          ? `${guest.primaryGuestName} is managing the RSVP for your household. Please contact them to submit your RSVP.`
          : "The primary contact for your household manages the RSVP. Please contact them."
      );
      return;
    }

    setLoadingHousehold(true);
    const household = await getHouseholdForRsvp(guest.householdId);
    setLoadingHousehold(false);

    if (household) {
      onHouseholdFound(household);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">RSVP</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search for your name to find your invitation.
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Searching..." : "Find My Invitation"}
        </Button>
      </form>

      {notPrimaryMessage && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          {notPrimaryMessage}
        </div>
      )}

      {results && results.guests.length === 0 && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          We couldn&apos;t find your name. Please check the spelling and try again,
          or contact the couple for help.
        </div>
      )}

      {results && results.guests.length > 0 && !notPrimaryMessage && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Select your name:</p>
          {results.guests.map((guest) => (
            <button
              key={guest.id}
              onClick={() => handleSelectGuest(guest)}
              disabled={loadingHousehold}
              className="w-full rounded-md border p-3 text-left transition hover:border-primary hover:bg-accent disabled:opacity-50"
            >
              <span className="font-medium">
                {guest.firstName} {guest.lastName}
              </span>
              {!guest.isPrimary && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (household member)
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
