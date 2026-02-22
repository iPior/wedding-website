"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VARIANTS = [1, 3, 5, 6, 7, 8, 9, 11];

const LABELS: Record<number, string> = {
  1: "Editorial",
  // 2: "Magazine",
  3: "Cinematic",
  // 4: "Utilitarian",
  5: "Stationery",
  6: "Botanical",
  7: "Sunset",
  8: "Coastal",
  9: "Provincial",
  // 10: "Art Deco",
  11: "Watercolor",
  // 12: "Mashup",
};

const FINAL_VARIANTS = [1, 2, 3];

const FINAL_LABELS: Record<number, string> = {
  1: "Stationery",
  2: "Cinematic",
  3: "Watercolor",
};

const FINALV2_VARIANTS = [1, 2, 3];

const FINALV2_LABELS: Record<number, string> = {
  1: "Stationery",
  2: "Cinematic",
  3: "Watercolor",
};

export function VariantSwitcher() {
  const pathname = usePathname();

  // Check for /finalv2/N routes first
  const finalv2Match = pathname.match(/^\/finalv2\/(\d{1,2})(\/|$)/);
  if (finalv2Match) {
    const current = parseInt(finalv2Match[1], 10);
    if (!FINALV2_VARIANTS.includes(current)) return null;

    const idx = FINALV2_VARIANTS.indexOf(current);
    const prev = FINALV2_VARIANTS[(idx - 1 + FINALV2_VARIANTS.length) % FINALV2_VARIANTS.length];
    const next = FINALV2_VARIANTS[(idx + 1) % FINALV2_VARIANTS.length];
    const subRoute = pathname.replace(/^\/finalv2\/\d{1,2}/, "");

    return (
      <SwitcherUI
        current={current}
        total={FINALV2_VARIANTS.length}
        label={FINALV2_LABELS[current]}
        prevHref={`/finalv2/${prev}${subRoute}`}
        prevLabel={FINALV2_LABELS[prev]}
        nextHref={`/finalv2/${next}${subRoute}`}
        nextLabel={FINALV2_LABELS[next]}
      />
    );
  }

  // Check for /final/N routes
  const finalMatch = pathname.match(/^\/final\/(\d{1,2})(\/|$)/);
  if (finalMatch) {
    const current = parseInt(finalMatch[1], 10);
    if (!FINAL_VARIANTS.includes(current)) return null;

    const idx = FINAL_VARIANTS.indexOf(current);
    const prev = FINAL_VARIANTS[(idx - 1 + FINAL_VARIANTS.length) % FINAL_VARIANTS.length];
    const next = FINAL_VARIANTS[(idx + 1) % FINAL_VARIANTS.length];
    const subRoute = pathname.replace(/^\/final\/\d{1,2}/, "");

    return (
      <SwitcherUI
        current={current}
        total={FINAL_VARIANTS.length}
        label={FINAL_LABELS[current]}
        prevHref={`/final/${prev}${subRoute}`}
        prevLabel={FINAL_LABELS[prev]}
        nextHref={`/final/${next}${subRoute}`}
        nextLabel={FINAL_LABELS[next]}
      />
    );
  }

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
    <SwitcherUI
      current={current}
      total={VARIANTS.length}
      label={LABELS[current]}
      prevHref={`/${prev}${subRoute}`}
      prevLabel={LABELS[prev]}
      nextHref={`/${next}${subRoute}`}
      nextLabel={LABELS[next]}
    />
  );
}

function SwitcherUI({
  current,
  total,
  label,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: {
  current: number;
  total: number;
  label: string;
  prevHref: string;
  prevLabel: string;
  nextHref: string;
  nextLabel: string;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-neutral-200 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur">
      <Link
        href={prevHref}
        className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        aria-label={`Previous: ${prevLabel}`}
      >
        <ChevronLeft className="size-4" />
      </Link>

      <div className="flex items-center gap-2 px-3">
        <span className="text-sm font-semibold tabular-nums text-neutral-900">
          {current}
        </span>
        <span className="text-xs text-neutral-400">/</span>
        <span className="text-xs tabular-nums text-neutral-400">{total}</span>
        <span className="ml-1 text-xs text-neutral-500">{label}</span>
      </div>

      <Link
        href={nextHref}
        className="flex size-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        aria-label={`Next: ${nextLabel}`}
      >
        <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}
