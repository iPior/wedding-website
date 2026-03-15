"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  submitRsvp,
  modifyRsvp,
  type HouseholdData,
  type SubmitRsvpInput,
  type RsvpResult,
} from "@/actions/rsvp";
import { normalizeLocale } from "@/lib/locale";

type GuestFormData = {
  id: string;
  firstName: string;
  lastName: string;
  attending: "YES" | "NO" | "";
  dietaryRestrictions: string;
};

type PlusOneFormData = {
  firstName: string;
  lastName: string;
  dietaryRestrictions: string;
};

type Props = {
  household: HouseholdData;
  modifyToken?: string;
  onSuccess: (anyAttending: boolean) => void;
};

export function RsvpForm({ household, modifyToken, onSuccess }: Props) {
  const t = useTranslations("RsvpForm");
  const tSearch = useTranslations("RsvpSearch");
  const tErr = useTranslations("Errors");
  const primaryGuest = household.guests.find((g) => g.isPrimary);
  const preferredLocale = useMemo(
    () => normalizeLocale(typeof navigator === "undefined" ? null : navigator.language),
    []
  );

  const [email, setEmail] = useState(primaryGuest?.email ?? "");
  const [guests, setGuests] = useState<GuestFormData[]>(
    household.guests.map((g) => ({
      id: g.id,
      firstName: g.firstName,
      lastName: g.lastName,
      attending: (g.attending === "YES" || g.attending === "NO" ? g.attending : "") as GuestFormData["attending"],
      dietaryRestrictions: g.dietaryRestrictions ?? "",
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

    if (!modifyToken && !email.trim()) {
      setError(t("emailRequired"));
      return;
    }

    for (const guest of guests) {
      if (!guest.attending) {
        setError(t("selectAttending", { name: `${guest.firstName} ${guest.lastName}` }));
        return;
      }
    }

    for (let i = 0; i < plusOnes.length; i++) {
      const po = plusOnes[i];
      if (!po.firstName.trim() || !po.lastName.trim()) {
        setError(t("plusOneName", { number: i + 1 }));
        return;
      }
    }

    setLoading(true);

    const input: SubmitRsvpInput = {
      householdId: household.householdId,
      email: email.trim(),
      preferredLocale,
      guests: guests.map((g) => ({
        id: g.id,
        attending: g.attending as "YES" | "NO",
        dietaryRestrictions: g.dietaryRestrictions || undefined,
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
      onSuccess(guests.some((g) => g.attending === "YES"));
    } else {
      setError(result.error ?? tErr("UNKNOWN"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header — only shown on initial RSVP */}
      {!modifyToken && (
        <div>
          <h2
            className="text-3xl text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {primaryGuest ? `${primaryGuest.firstName} ${primaryGuest.lastName}` : household.householdName}
          </h2>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
            {t("respondSubtitle")}
          </p>
        </div>
      )}

      {/* Email — shown as editable on initial RSVP, hidden on modify */}
      {!modifyToken && (
        <>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground"
            >
              {t("yourEmail")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              required
              className="w-full border border-input bg-card px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground/45 focus:border-accent focus:outline-none focus:ring-0 transition-colors"
            />
            <p className="text-xs text-muted-foreground">
              {t("emailHelp")}
            </p>
          </div>
          <div className="h-px bg-border" />
        </>
      )}

      {/* Guests */}
      <div className="space-y-8">
        {guests.map((guest, index) => (
          <div key={guest.id}>
            {index > 0 && <div className="h-px bg-border mb-8" />}
            <div className="space-y-5">
              <div className="flex items-baseline gap-3">
                <h3
                  className="text-xl text-primary"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {guest.firstName} {guest.lastName}
                </h3>
                {household.guests[index]?.isPrimary && (
                  <span className="text-[0.6rem] uppercase tracking-[0.15em] text-accent">
                    {t("primary")}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {t("willYouAttend")}
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => updateGuest(index, "attending", "YES")}
                    className={`flex-1 py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border transition-all ${
                      guest.attending === "YES"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted border-primary text-foreground-soft hover:bg-surface-hover hover:text-primary"
                    }`}
                  >
                    {t("joyfullyAccepts")}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateGuest(index, "attending", "NO")}
                    className={`flex-1 py-3.5 text-[0.7rem] uppercase tracking-[0.15em] border transition-all ${
                      guest.attending === "NO"
                        ? "bg-destructive text-primary-foreground border-destructive"
                        : "bg-muted border-destructive-soft text-foreground-soft hover:bg-surface-hover hover:text-destructive"
                    }`}
                  >
                    {t("regretfullyDeclines")}
                  </button>
                </div>
              </div>

              {guest.attending === "YES" && (
                <div className="space-y-2">
                  <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("dietaryRestrictions")}
                  </label>
                  <textarea
                    value={guest.dietaryRestrictions}
                    onChange={(e) => updateGuest(index, "dietaryRestrictions", e.target.value)}
                    placeholder={t("dietaryPlaceholder")}
                    rows={2}
                    className="w-full border border-input bg-card px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground/45 focus:border-accent focus:outline-none focus:ring-0 transition-colors resize-none"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Plus-Ones */}
      {household.maxPlusOnes > 0 && (
        <>
          <div className="h-px bg-border" />
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <h3
                  className="text-xl text-primary"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {t("additionalGuests")}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("plusOneAllowance", { count: household.maxPlusOnes })}
                </p>
              </div>
              {plusOnes.length < household.maxPlusOnes && (
                <button
                  type="button"
                  onClick={addPlusOne}
                  className="bg-border border border-border px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.15em] text-foreground-soft transition-colors hover:bg-surface-hover"
                >
                  {t("addGuest")}
                </button>
              )}
            </div>

            {plusOnes.map((po, index) => (
              <div key={index} className="space-y-4 border-l-2 border-border pl-5">
                <div className="flex items-baseline justify-between">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    {t("guestNumber", { number: index + 1 })}
                  </p>
                  <button
                    type="button"
                    onClick={() => removePlusOne(index)}
                    className="py-1.5 px-2 text-[0.62rem] uppercase tracking-[0.15em] text-accent hover:text-primary transition-colors"
                  >
                    {t("remove")}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {tSearch("firstName")}
                    </label>
                    <input
                      value={po.firstName}
                      onChange={(e) => updatePlusOne(index, "firstName", e.target.value)}
                      required
                      className="w-full border border-input bg-card px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground/45 focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {tSearch("lastName")}
                    </label>
                    <input
                      value={po.lastName}
                      onChange={(e) => updatePlusOne(index, "lastName", e.target.value)}
                      required
                      className="w-full border border-input bg-card px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground/45 focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("dietaryRestrictions")}
                  </label>
                  <textarea
                    value={po.dietaryRestrictions}
                    onChange={(e) => updatePlusOne(index, "dietaryRestrictions", e.target.value)}
                    placeholder={t("dietaryPlaceholder")}
                    rows={2}
                    className="w-full border border-input bg-card px-3 py-2.5 text-sm text-primary placeholder:text-muted-foreground/45 focus:border-accent focus:outline-none focus:ring-0 transition-colors resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {error && (
        <div className="border border-border bg-surface px-5 py-4 text-sm text-foreground-soft">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary py-3.5 text-[0.7rem] uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
      >
        {loading
          ? t("submitting")
          : modifyToken
            ? t("updateRsvp")
            : t("submitRsvp")}
      </button>

    </form>
  );
}
