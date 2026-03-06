import { weddingConfig } from "../../../../../wedding.config";
import { LazyMap } from "@/components/lazy-map";
import { getTranslations, getLocale } from "next-intl/server";

const CEREMONY_EMBED =
  "https://maps.google.com/maps?q=4260+Cawthra+Rd+Mississauga+ON+L4Z+1V8&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const RECEPTION_EMBED =
  "https://maps.google.com/maps?q=20+Polonia+Ave+Brampton+ON+L6Y+5W8&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const CEREMONY_LINK =
  "https://maps.google.com/maps?q=4260+Cawthra+Rd+Mississauga+ON+L4Z+1V8";
const RECEPTION_LINK =
  "https://maps.google.com/maps?q=20+Polonia+Ave+Brampton+ON+L6Y+5W8";

const weddingDate = new Date(weddingConfig.date);

function VenueCard({
  label,
  time,
  name,
  address,
  embedSrc,
  screenshotSrc,
  directionsHref,
  mapTitle,
  openInMapsText,
}: {
  label: string;
  time?: string;
  name: string;
  address: string;
  embedSrc: string;
  screenshotSrc: string;
  directionsHref: string;
  mapTitle: string;
  openInMapsText: string;
}) {
  return (
    <div className="sm:border sm:border-[var(--color-border)] sm:bg-[var(--color-background)] sm:p-8">
        {/* Label + time */}
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">{label}</p>
          {time && (
            <p className="text-xs tracking-[0.15em] text-[var(--color-muted-foreground)]">{time}</p>
          )}
        </div>

        {/* Venue name + address */}
        <h3
          className="text-2xl text-[var(--color-primary)] mb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)] mb-6">{address}</p>

        {/* Map — static screenshot, click to load interactive */}
        <LazyMap
          embedSrc={embedSrc}
          screenshotSrc={screenshotSrc}
          title={mapTitle}
        />

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-primary)]"
        >
          {openInMapsText}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 8 L8 2 M4 2 H8 V6" />
          </svg>
        </a>
    </div>
  );
}

export default async function DetailsPage() {
  const t = await getTranslations("Details");
  const tVenue = await getTranslations("Venues");
  const locale = await getLocale();

  const formattedDate = weddingDate.toLocaleDateString(
    locale === "pl" ? "pl-PL" : "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const ceremonyName = tVenue("ceremonyName");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">

      {/* ───────── 001 — When & Where ───────── */}
      <section className="mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">{t("sectionNumber")}</p>
        <h2
          className="text-5xl text-[var(--color-primary)] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("title")}
        </h2>
        <p className="text-base leading-relaxed text-[var(--color-foreground-soft)] mb-14 md:mb-10">
          {t("subtitle", { date: formattedDate })}
        </p>

        <div className="space-y-16 md:space-y-8">
          <VenueCard
            label={t("ceremony")}
            time={weddingConfig.schedule[0].time}
            name={ceremonyName}
            address={weddingConfig.venue.ceremony.address}
            embedSrc={CEREMONY_EMBED}
            screenshotSrc="/maps/ceremony-map.png"
            directionsHref={CEREMONY_LINK}
            mapTitle="Ceremony venue map"
            openInMapsText={t("openInMaps")}
          />
          <VenueCard
            label={t("reception")}
            time={weddingConfig.schedule[1].time}
            name={weddingConfig.venue.reception.name}
            address={weddingConfig.venue.reception.address}
            embedSrc={RECEPTION_EMBED}
            screenshotSrc="/maps/reception-map.png"
            directionsHref={RECEPTION_LINK}
            mapTitle="Reception venue map"
            openInMapsText={t("openInMaps")}
          />
        </div>
      </section>

      <div className="h-px bg-[var(--color-border)] mb-14" />

      {/* ───────── 002 — Schedule ───────── */}
      <section>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">{t("scheduleNumber")}</p>
        <h2
          className="text-5xl text-[var(--color-primary)] mb-10"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {t("scheduleTitle")}
        </h2>
        <div>
          {weddingConfig.schedule.map((item, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between border-b border-[var(--color-border)] py-5 last:border-b-0"
            >
              <span
                className="text-lg text-[var(--color-primary)]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {t(`schedule.${i}`)}
              </span>
              <span className="text-xs tracking-[0.2em] text-[var(--color-muted-foreground)]">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
