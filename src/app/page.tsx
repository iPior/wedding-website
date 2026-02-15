import { weddingConfig } from "../../wedding.config";
import { GuestLayout } from "@/components/layout/guest-layout";
import { CountdownTimer } from "@/components/countdown-timer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function HomePage() {
  const { couple, date, venue, tagline, schedule } = weddingConfig;
  const weddingDate = new Date(date);
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = weddingDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
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
      </div>
    </GuestLayout>
  );
}
