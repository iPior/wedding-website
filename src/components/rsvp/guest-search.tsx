"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { searchGuests, getHouseholdForRsvp, type SearchResult, type HouseholdData } from "@/actions/rsvp";

type Props = {
  onHouseholdFound: (data: HouseholdData) => void;
};

export function GuestSearch({ onHouseholdFound }: Props) {
  const t = useTranslations("RsvpSearch");
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
          ? t("notPrimaryWithName", { name: guest.primaryGuestName })
          : t("notPrimaryGeneric")
      );
      return;
    }

    setLoadingHousehold(true);
    const household = await getHouseholdForRsvp(guest.householdId);
    setLoadingHousehold(false);

    if (household) {
      onHouseholdFound(household);
    } else {
      setNotPrimaryMessage(t("loadError"));
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]"
            >
              {t("firstName")}
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t("firstNamePlaceholder")}
              required
              className="w-full border border-[var(--color-input)] bg-card px-3 py-2.5 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted-foreground)]/45 focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]"
            >
              {t("lastName")}
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t("lastNamePlaceholder")}
              required
              className="w-full border border-[var(--color-input)] bg-card px-3 py-2.5 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-muted-foreground)]/45 focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--color-primary)] py-3.5 text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-accent)] disabled:opacity-50"
        >
          {loading ? t("searching") : t("findInvitation")}
        </button>
      </form>

      {notPrimaryMessage && (
        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-foreground-soft)]">
          {notPrimaryMessage}
        </div>
      )}

      {results && results.guests.length === 0 && (
        <div className="border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-foreground-soft)]">
          {t("notFound")}
        </div>
      )}

      {results && results.guests.length > 0 && !notPrimaryMessage && (
        <div className="space-y-3">
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
            {t("selectName")}
          </p>
          {results.guests.map((guest) => (
            <button
              key={guest.id}
              onClick={() => handleSelectGuest(guest)}
              disabled={loadingHousehold}
              className="group w-full border border-[var(--color-border)] px-5 py-4 text-left transition-all hover:border-[var(--color-accent)] hover:shadow-sm hover:-translate-y-px disabled:opacity-50"
            >
              <span
                className="text-lg text-[var(--color-primary)]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {guest.firstName} {guest.lastName}
              </span>
              {!guest.isPrimary && (
                <span className="ml-3 text-[0.62rem] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]">
                  {t("householdMember")}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
