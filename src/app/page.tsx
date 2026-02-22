import Link from "next/link";
import { weddingConfig } from "../../wedding.config";
import { GuestLayout } from "@/components/layout/guest-layout";
import { CountdownTimer } from "@/components/countdown-timer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { couple, date, tagline, ourStory } = weddingConfig;
  const weddingDate = new Date(date);
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <GuestLayout>
      <div className="space-y-16">
        {/* Hero */}
        <section className="py-8 text-center sm:py-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            {tagline}
          </p>
          <h1 className="mt-4 font-playfair text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {couple.person1.firstName}
            <span className="text-muted-foreground"> & </span>
            {couple.person2.firstName}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{formattedDate}</p>
          <Separator className="mx-auto mt-8 max-w-24" />
        </section>

        {/* Countdown */}
        <section>
          <CountdownTimer />
        </section>

        {/* Our Story */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="font-playfair text-2xl font-semibold">
              {ourStory.title}
            </h2>
          </div>
          <div className="space-y-6">
            {ourStory.milestones.map((milestone) => (
              <div key={milestone.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {milestone.year}
                  </span>
                  <div className="mt-2 h-full w-px bg-border" />
                </div>
                <div className="pb-4">
                  <h3 className="font-playfair text-lg font-semibold">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RSVP CTA */}
        <section className="py-8 text-center">
          <h2 className="font-playfair text-2xl font-semibold">
            We&apos;d Love to See You There
          </h2>
          <p className="mt-2 text-muted-foreground">
            Let us know if you can make it — we can&apos;t wait to celebrate
            with you.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/rsvp">RSVP Now</Link>
          </Button>
        </section>
      </div>
    </GuestLayout>
  );
}
