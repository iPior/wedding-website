import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/fade-in";
import { weddingConfig } from "../../../../../../wedding.config";

const { ceremony, reception } = weddingConfig.venue;
const weddingDate = new Date(weddingConfig.date);

export default async function RsvpConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ attending?: string }>;
}) {
  const t = await getTranslations("RsvpConfirmation");
  const locale = await getLocale();
  const params = await searchParams;
  const isAttending = params.attending !== "false";

  const formattedDate = weddingDate.toLocaleDateString(
    locale === "pl" ? "pl-PL" : "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <section className="flex min-h-[calc(100vh-15rem)] items-center justify-center px-6 py-16 text-center">
      <FadeIn className="w-full max-w-xl space-y-10">

        {/* Thank you */}
        <div className="space-y-3">
          <h1
            className="text-5xl text-primary"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("thankYou")}
          </h1>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">
            {isAttending ? t("excited") : t("missYou")}
          </p>
        </div>

        <div className="mx-auto h-px w-16 bg-border" />

        {/* Confirmation note */}
        <p className="text-sm leading-relaxed text-foreground-soft">
          {isAttending ? t("submitted") : t("declineMessage")}
        </p>

        <div className="mx-auto h-px w-16 bg-border" />

        {isAttending ? (
          <>
            {/* Date */}
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              {formattedDate}
            </p>

            {/* Venues */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="border border-border px-6 py-5 space-y-1">
                <p className="text-[0.62rem] uppercase tracking-[0.22em] text-accent">
                  {t("ceremony")}
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
                  {t("reception")}
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

            {/* CTA */}
            <Link
              href="/details"
              className="inline-block bg-primary px-10 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
            >
              {t("viewDetails")}
            </Link>
          </>
        ) : (
          <Link
            href="/"
            className="inline-block bg-primary px-10 py-3.5 text-[0.7rem] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
          >
            {t("backHome")}
          </Link>
        )}

      </FadeIn>
    </section>
  );
}
