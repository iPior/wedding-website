import { weddingConfig } from "../../../wedding.config";
import { GuestLayout } from "@/components/layout/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function DetailsPage() {
  const { venue, schedule, accommodations, registry, date } = weddingConfig;
  const weddingDate = new Date(date);
  const formattedTime = weddingDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <GuestLayout>
      <div className="space-y-16">
        <section className="text-center">
          <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl">
            Wedding Details
          </h1>
          <p className="mt-2 text-muted-foreground">
            Everything you need to know about the big day.
          </p>
        </section>

        {/* Venue */}
        <section className="space-y-6">
          <h2 className="text-center font-playfair text-2xl font-semibold">
            Venue
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Ceremony
                </p>
                <p className="mt-2 font-semibold">{venue.ceremony.name}</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {venue.ceremony.address}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formattedTime}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Reception
                </p>
                <p className="mt-2 font-semibold">{venue.reception.name}</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" />
                  {venue.reception.address}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Schedule */}
        {schedule && schedule.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-center font-playfair text-2xl font-semibold">
              Schedule
            </h2>
            <div className="mx-auto max-w-sm space-y-3">
              {schedule.map((item) => (
                <div key={item.time} className="flex items-center gap-4">
                  <span className="w-20 shrink-0 text-right text-sm font-medium text-muted-foreground">
                    {item.time}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm font-medium">{item.event}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Accommodations */}
        <section className="space-y-6">
          <h2 className="text-center font-playfair text-2xl font-semibold">
            Accommodations
          </h2>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="font-semibold">{accommodations.hotel}</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" />
                {accommodations.address}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {accommodations.note}
              </p>
              <a
                href={accommodations.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium underline underline-offset-4 hover:text-foreground"
              >
                Book Your Room
              </a>
            </CardContent>
          </Card>
        </section>

        {/* Registry */}
        <section className="space-y-6">
          <h2 className="text-center font-playfair text-2xl font-semibold">
            Registry
          </h2>
          <div className="text-center">
            <a
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
            >
              {registry.label}
            </a>
          </div>
        </section>
      </div>
    </GuestLayout>
  );
}
