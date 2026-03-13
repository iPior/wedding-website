"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HouseholdData } from "@/actions/rsvp";
import { RsvpForm } from "./rsvp-form";
import { weddingConfig } from "../../../wedding.config";

const { ceremony, reception } = weddingConfig.venue;
const weddingDate = new Date(weddingConfig.date);

type Props = {
  household: HouseholdData;
  token: string;
};

export function ModifyRsvpClient({ household, token }: Props) {
  const t = useTranslations("ModifyRsvp");
  const tc = useTranslations("RsvpConfirmation");
  const locale = useLocale();
  const [confirmed, setConfirmed] = useState(false);
  const [anyAttending, setAnyAttending] = useState(true);

  const formattedDate = weddingDate.toLocaleDateString(
    locale === "pl" ? "pl-PL" : "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  if (confirmed) {
    return (
      <section className="flex min-h-[calc(100vh-15rem)] items-center justify-center px-6 py-16 text-center">
        <div className="w-full max-w-xl space-y-10">

          <div className="space-y-3">
            <h2
              className="text-5xl text-primary"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {t("updatedTitle")}
            </h2>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">
              {anyAttending ? tc("excited") : tc("missYou")}
            </p>
          </div>

          <div className="mx-auto h-px w-16 bg-border" />

          <p className="text-sm leading-relaxed text-foreground-soft">
            {anyAttending ? t("updatedMessage") : tc("declineMessage")}
          </p>

          <div className="mx-auto h-px w-16 bg-border" />

          {anyAttending ? (
            <>
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                {formattedDate}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="border border-border px-6 py-5 space-y-1">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-accent">
                    {tc("ceremony")}
                  </p>
                  <p
                    className="text-base text-primary"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {ceremony.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{ceremony.address}</p>
                </div>
                <div className="border border-border px-6 py-5 space-y-1">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-accent">
                    {tc("reception")}
                  </p>
                  <p
                    className="text-base text-primary"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {reception.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{reception.address}</p>
                </div>
              </div>

              <Link
                href="/details"
                className="inline-block bg-primary px-10 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
              >
                {tc("viewDetails")}
              </Link>
            </>
          ) : (
            <Link
              href="/"
              className="inline-block bg-primary px-10 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
            >
              {tc("backHome")}
            </Link>
          )}

        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-4xl text-primary mb-3"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("title")}
        </h1>
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>
      <div className="h-px bg-border" />
      <RsvpForm
        household={household}
        modifyToken={token}
        onSuccess={(attending) => {
          setAnyAttending(attending);
          setConfirmed(true);
        }}
      />
    </div>
  );
}
