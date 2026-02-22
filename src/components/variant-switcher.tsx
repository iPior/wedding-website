"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VARIANTS = [1, 2, 3];

const LABELS: Record<number, string> = {
  1: "Stationery",
  2: "Cinematic",
  3: "Watercolor",
};

export function VariantSwitcher() {
  const pathname = usePathname();

  const match = pathname.match(/^\/(\d{1,2})(\/|$)/);
  if (!match) return null;

  const current = parseInt(match[1], 10);
  if (!VARIANTS.includes(current)) return null;

  const idx = VARIANTS.indexOf(current);
  const prev = VARIANTS[(idx - 1 + VARIANTS.length) % VARIANTS.length];
  const next = VARIANTS[(idx + 1) % VARIANTS.length];
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
