"use client";

import { useState } from "react";
import Image from "next/image";

export function LazyMap({
  embedSrc,
  screenshotSrc,
  title,
}: {
  embedSrc: string;
  screenshotSrc: string;
  title: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="ring-1 ring-[var(--color-border)] overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: "76%" }}>
          <iframe
            src={embedSrc}
            className="absolute inset-0 h-full w-full"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
          />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="ring-1 ring-[var(--color-border)] overflow-hidden w-full text-left cursor-pointer group"
    >
      <div className="relative w-full" style={{ paddingBottom: "76%" }}>
        <Image
          src={screenshotSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition-colors">
          <span className="rounded-full bg-card/90 px-4 py-2 text-xs tracking-[0.15em] text-[var(--color-primary)] shadow-sm backdrop-blur-sm">
            Click for interactive map
          </span>
        </div>
      </div>
    </button>
  );
}
