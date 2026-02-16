"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { weddingConfig } from "../../../wedding.config";

const NAV_ITEMS = [
  { href: "/4", label: "Home" },
  { href: "/4/details", label: "Details" },
  { href: "/4/faq", label: "FAQ" },
  { href: "/4/bridal-party", label: "Party" },
  { href: "/4/rsvp", label: "RSVP" },
];

export function Nav4() {
  const pathname = usePathname();
  const { person1, person2 } = weddingConfig.couple;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link
            href="/4"
            className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-neutral-900 transition-colors duration-150 hover:text-neutral-500"
          >
            {person1.firstName}
            <span className="mx-1.5 text-neutral-300">&</span>
            {person2.firstName}
          </Link>

          <nav
            className="flex gap-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/4"
                  ? pathname === "/4"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap px-3 py-2 font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.15em] text-neutral-400 transition-colors duration-150 hover:text-neutral-900",
                    isActive && "font-medium text-neutral-900"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-neutral-900" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
