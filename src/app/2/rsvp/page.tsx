import { Card, CardContent } from "@/components/ui/card";
import { RsvpFlow } from "@/components/rsvp/rsvp-flow";
import { Heart } from "lucide-react";

export default function Variant2Rsvp() {
  return (
    <div className="mx-auto max-w-lg space-y-10">
      {/* Page Header */}
      <div
        className="text-center"
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          opacity: 0,
        }}
      >
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
          Respond
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight text-neutral-900 sm:text-5xl">
          RSVP
        </h1>
        <p className="mt-3 text-[15px] font-light text-neutral-500">
          We can&apos;t wait to hear from you.
        </p>
      </div>

      {/* RSVP Card */}
      <Card
        className="overflow-hidden rounded-xl border border-neutral-100 shadow-none"
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          animationDelay: "0.1s",
          opacity: 0,
        }}
      >
        <div className="border-t-2 border-neutral-900" />
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 text-neutral-400" />
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
              Your Response
            </span>
          </div>
          <RsvpFlow />
        </CardContent>
      </Card>
    </div>
  );
}
