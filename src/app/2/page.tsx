import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { ArrowRight } from "lucide-react";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;
const { ourStory } = weddingConfig;

const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function Variant2Home() {
  return (
    <div className="space-y-20">
      {/* Hero Card */}
      <Card
        className="overflow-hidden rounded-xl border border-neutral-100 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 shadow-none"
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          opacity: 0,
        }}
      >
        <CardContent className="relative flex flex-col items-center px-6 py-20 text-center sm:py-28">
          {/* Decorative top line */}
          <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-400">
            {weddingConfig.tagline}
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl tracking-tight text-neutral-900 sm:text-7xl">
            {person1.firstName}
            <span className="mx-3 text-neutral-200 sm:mx-4">&</span>
            {person2.firstName}
          </h1>

          <p className="mt-5 text-[15px] font-light tracking-wide text-neutral-500">
            {formattedDate}
          </p>

          <div className="mt-10">
            <CountdownTimer />
          </div>

          {/* Decorative bottom line */}
          <div className="absolute bottom-0 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
        </CardContent>
      </Card>

      {/* Our Story */}
      <section>
        <div
          style={{
            animation: "fadeInUp 0.6s ease forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
            Our Journey
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight text-neutral-900 sm:text-4xl">
            {ourStory.title}
          </h2>
          <p className="mt-3 max-w-xl text-[15px] font-light leading-relaxed text-neutral-500">
            {ourStory.intro}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {ourStory.milestones.map((milestone, i) => (
            <Card
              key={milestone.year}
              className={`group overflow-hidden rounded-xl border border-neutral-100 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
              style={{
                animation: "fadeInUp 0.6s ease forwards",
                animationDelay: `${(i + 2) * 0.1}s`,
                opacity: 0,
              }}
            >
              <div className="border-t-2 border-neutral-900" />
              <CardContent className={`p-6 ${i === 0 ? "sm:p-8" : ""}`}>
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                  {milestone.year}
                </p>
                <h3
                  className={`mt-2 font-[family-name:var(--font-display)] text-neutral-900 ${
                    i === 0 ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  {milestone.title}
                </h3>
                <p
                  className={`mt-2 font-light leading-relaxed text-neutral-500 ${
                    i === 0 ? "text-[15px] sm:max-w-lg" : "text-sm"
                  }`}
                >
                  {milestone.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* RSVP CTA */}
      <Card
        className="overflow-hidden rounded-xl border-0 bg-neutral-950 shadow-none"
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          animationDelay: "0.6s",
          opacity: 0,
        }}
      >
        <CardContent className="flex flex-col items-center px-6 py-16 text-center">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-500">
            Join Us
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-tight text-white sm:text-3xl">
            We&apos;d love to celebrate with you
          </h2>
          <p className="mt-3 text-[15px] font-light text-neutral-400">
            Please let us know if you can make it.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-lg bg-white px-8 text-neutral-900 transition-all duration-300 hover:bg-neutral-100 hover:shadow-lg"
          >
            <Link href="/2/rsvp" className="flex items-center gap-2">
              RSVP Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
