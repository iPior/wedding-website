import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@/components/countdown-timer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Variant4Home() {
  const { couple, date, tagline, venue, ourStory } = weddingConfig;
  const { person1, person2 } = couple;
  const weddingDate = new Date(date);
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section
        style={{ animation: "fadeIn 0.4s ease forwards" }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
          {person1.firstName} {person1.lastName}
          <span className="mx-2 text-neutral-300">&</span>
          {person2.firstName} {person2.lastName}
        </h1>
        <div className="mt-2 border-t border-neutral-200 pt-3">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <span className="font-[family-name:var(--font-display)] text-[11px] uppercase tracking-wider text-neutral-400">
              Date:
            </span>
            <span className="font-normal text-neutral-700">{formattedDate}</span>

            <span className="font-[family-name:var(--font-display)] text-[11px] uppercase tracking-wider text-neutral-400">
              Location:
            </span>
            <span className="font-normal text-neutral-700">
              {venue.ceremony.address.split(",").slice(-2).join(",").trim()}
            </span>

            <span className="font-[family-name:var(--font-display)] text-[11px] uppercase tracking-wider text-neutral-400">
              Status:
            </span>
            <span className="font-normal text-neutral-700">{tagline}</span>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section
        className="border-y border-neutral-200 py-6 text-center"
        style={{ animation: "fadeIn 0.4s ease forwards", animationDelay: "0.1s", opacity: 0 }}
      >
        <CountdownTimer />
      </section>

      {/* Our Story */}
      <section
        style={{ animation: "fadeIn 0.4s ease forwards", animationDelay: "0.2s", opacity: 0 }}
      >
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-display)] text-sm text-neutral-300">
            01 &mdash;
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider">
            {ourStory.title}
          </h2>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-neutral-500">
          {ourStory.intro}
        </p>

        <div className="border-t border-neutral-100">
          {ourStory.milestones.map((milestone, i) => (
            <div
              key={milestone.year}
              className="flex gap-4 border-b border-neutral-100 py-3 text-sm"
              style={{
                animation: "fadeIn 0.4s ease forwards",
                animationDelay: `${0.3 + i * 0.05}s`,
                opacity: 0,
              }}
            >
              <span className="w-12 shrink-0 font-[family-name:var(--font-display)] text-xs tabular-nums text-neutral-400">
                {milestone.year}
              </span>
              <div className="min-w-0">
                <span className="font-medium text-neutral-900">
                  {milestone.title}
                </span>
                <span className="text-neutral-500">
                  {" "}&mdash; {milestone.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP CTA */}
      <section
        className="border-t border-neutral-200 pt-6"
        style={{ animation: "fadeIn 0.4s ease forwards", animationDelay: "0.5s", opacity: 0 }}
      >
        <div className="flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-display)] text-sm text-neutral-300">
            02 &mdash;
          </span>
          <div className="space-y-3">
            <p className="text-sm text-neutral-500">
              Ready to confirm your attendance?
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-none border-neutral-900 font-[family-name:var(--font-display)] text-[11px] uppercase tracking-[0.15em] text-neutral-900 transition-colors duration-150 hover:bg-neutral-900 hover:text-white"
            >
              <Link href="/4/rsvp">RSVP Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
