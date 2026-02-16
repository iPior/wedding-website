import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock } from "lucide-react";
import { weddingConfig } from "../../../../wedding.config";

const { venue, schedule } = weddingConfig;

export default function Variant2Details() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          opacity: 0,
        }}
      >
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
          The Day
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight text-neutral-900 sm:text-5xl">
          Wedding Details
        </h1>
      </div>

      {/* Venue Cards — asymmetric grid */}
      <div className="grid gap-5 sm:grid-cols-5">
        <Card
          className="overflow-hidden rounded-xl border border-neutral-100 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:col-span-3"
          style={{
            animation: "fadeInUp 0.6s ease forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          <div className="border-t-2 border-neutral-900" />
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-neutral-400" />
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                Ceremony
              </span>
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-neutral-900">
              {venue.ceremony.name}
            </h2>
            <p className="mt-2 text-sm font-light text-neutral-500">
              {venue.ceremony.address}
            </p>
          </CardContent>
        </Card>

        <Card
          className="overflow-hidden rounded-xl border border-neutral-100 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:col-span-2"
          style={{
            animation: "fadeInUp 0.6s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <div className="border-t-2 border-neutral-900" />
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-neutral-400" />
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
                Reception
              </span>
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-neutral-900">
              {venue.reception.name}
            </h2>
            <p className="mt-2 text-sm font-light text-neutral-500">
              {venue.reception.address}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Card */}
      <Card
        className="overflow-hidden rounded-xl border border-neutral-100 shadow-none"
        style={{
          animation: "fadeInUp 0.6s ease forwards",
          animationDelay: "0.3s",
          opacity: 0,
        }}
      >
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
              Schedule
            </span>
          </div>
          <div className="mt-6">
            {schedule.map((item, i) => (
              <div key={item.event}>
                <div className="flex items-baseline gap-6 py-4">
                  <span className="w-24 shrink-0 font-[family-name:var(--font-display)] text-lg text-neutral-900">
                    {item.time}
                  </span>
                  <span className="text-[15px] font-light text-neutral-500">
                    {item.event}
                  </span>
                </div>
                {i < schedule.length - 1 && (
                  <Separator className="bg-neutral-100" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
