"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VARIANTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const LABELS: Record<number, string> = {
  1: "Editorial",
  2: "Magazine",
  3: "Cinematic",
  4: "Utilitarian",
  5: "Stationery",
  6: "Botanical",
  7: "Sunset",
  8: "Coastal",
  9: "Provincial",
  10: "Art Deco",
  11: "Watercolor",
};

export function VariantSwitcher() {
  const pathname = usePathname();

  // Extract variant number from pathname (e.g. /7/details -> 7)
  const match = pathname.match(/^\/(\d{1,2})(\/|$)/);
  if (!match) return null;

  const current = parseInt(match[1], 10);
  if (!VARIANTS.includes(current)) return null;

  const idx = VARIANTS.indexOf(current);
  const prev = VARIANTS[(idx - 1 + VARIANTS.length) % VARIANTS.length];
  const next = VARIANTS[(idx + 1) % VARIANTS.length];

  // Preserve sub-route (e.g. /details, /faq)
  const subRoute = pathname.replace(/^\/\d{1,2}/, "");

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-neutral-200 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur"
    >
      <Link
        href={`/${prev}${subRoute}`}
        className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        aria-label={`Previous: ${LABELS[prev]}`}
      >
        <ChevronLeft className="size-4" />
      </Link>

      <div className="flex items-center gap-2 px-3">
        <span className="text-sm font-semibold tabular-nums text-neutral-900">
          {current}
        </span>
        <span className="text-xs text-neutral-400">/</span>
        <span className="text-xs tabular-nums text-neutral-400">
          {VARIANTS.length}
        </span>
        <span className="ml-1 text-xs text-neutral-500">
          {LABELS[current]}
        </span>
      </div>

      <Link
        href={`/${next}${subRoute}`}
        className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        aria-label={`Next: ${LABELS[next]}`}
      >
        <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}
