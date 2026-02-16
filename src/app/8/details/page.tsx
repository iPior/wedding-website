import { weddingConfig } from "../../../../wedding.config";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

export default function Variant8Details() {
  const { venue, schedule } = weddingConfig;

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      {/* Page heading */}
      <div
        className="text-center"
        style={{
          animation: "fadeInUp 0.9s ease-in-out forwards",
          opacity: 0,
        }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wide text-[#4A7C8A] sm:text-5xl">
          Wedding Details
        </h1>
        <svg
          viewBox="0 0 1200 40"
          className="mx-auto mt-6 h-6 w-full max-w-xs text-[#D0DDE3]"
        >
          <path
            d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Venue cards */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {/* Ceremony */}
        <Card
          className="overflow-hidden rounded-xl border-[#D0DDE3] bg-[#EDF3F6] shadow-sm"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          <CardContent className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#A8C5D6]/30">
                <MapPin className="size-4 text-[#4A7C8A]" strokeWidth={1.5} />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[#4A7C8A]">
                Ceremony
              </h2>
            </div>
            <p className="font-[family-name:var(--font-body)] text-base font-medium text-[#1E3A42]">
              {venue.ceremony.name}
            </p>
            <p className="mt-1 font-[family-name:var(--font-body)] text-sm font-light text-[#6B7F8A]">
              {venue.ceremony.address}
            </p>
          </CardContent>
        </Card>

        {/* Reception */}
        <Card
          className="overflow-hidden rounded-xl border-[#D0DDE3] bg-[#EDF3F6] shadow-sm"
          style={{
            animation: "fadeInUp 0.9s ease-in-out forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <CardContent className="p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#A8C5D6]/30">
                <MapPin className="size-4 text-[#4A7C8A]" strokeWidth={1.5} />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[#4A7C8A]">
                Reception
              </h2>
            </div>
            <p className="font-[family-name:var(--font-body)] text-base font-medium text-[#1E3A42]">
              {venue.reception.name}
            </p>
            <p className="mt-1 font-[family-name:var(--font-body)] text-sm font-light text-[#6B7F8A]">
              {venue.reception.address}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule */}
      <div
        className="mt-20"
        style={{
          animation: "fadeInUp 0.9s ease-in-out forwards",
          animationDelay: "0.45s",
          opacity: 0,
        }}
      >
        <div className="mb-8 flex items-center gap-3">
          <Clock className="size-5 text-[#4A7C8A]" strokeWidth={1.5} />
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#4A7C8A]">
            Schedule
          </h2>
        </div>

        <div className="space-y-0">
          {schedule.map((item, index) => (
            <div
              key={item.event}
              className="flex items-center gap-6 border-b border-[#D0DDE3]/60 py-5 last:border-b-0"
              style={{
                animation: "fadeInUp 0.9s ease-in-out forwards",
                animationDelay: `${0.6 + index * 0.15}s`,
                opacity: 0,
              }}
            >
              <span className="w-24 shrink-0 font-[family-name:var(--font-body)] text-sm font-medium tracking-wide text-[#D4956A]">
                {item.time}
              </span>
              <span className="font-[family-name:var(--font-body)] text-base font-light text-[#1E3A42]">
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
