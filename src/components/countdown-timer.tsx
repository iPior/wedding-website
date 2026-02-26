"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { weddingConfig } from "../../wedding.config";

function calculateTimeLeft(targetDate: string) {
  const difference = new Date(targetDate).getTime() - Date.now();
  if (difference <= 0) return null;
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function subscribe(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getSnapshot() {
  return JSON.stringify(calculateTimeLeft(weddingConfig.date));
}

function getServerSnapshot() {
  return JSON.stringify(null);
}

export function CountdownTimer({ numberClassName = "font-playfair" }: { numberClassName?: string }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const timeLeft = JSON.parse(snapshot) as ReturnType<typeof calculateTimeLeft>;
  const t = useTranslations("Countdown");

  if (!timeLeft)
    return (
      <p className="text-center text-lg text-muted-foreground">
        {t("bigDay")}
      </p>
    );

  const units = [
    { label: t("days"), value: timeLeft.days },
    { label: t("hours"), value: timeLeft.hours },
    { label: t("minutes"), value: timeLeft.minutes },
    { label: t("seconds"), value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className={`${numberClassName} text-3xl font-semibold tabular-nums sm:text-4xl`}>
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
