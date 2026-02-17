"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { weddingConfig } from "../../../wedding.config";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/12", label: "Home" },
  { href: "/12/details", label: "Details" },
  { href: "/12/rsvp", label: "RSVP" },
  { href: "/12/faq", label: "FAQ" },
  { href: "/12/bridal-party", label: "Wedding Party" },
];

export function Nav12() {
  const pathname = usePathname();
  const { person1, person2 } = weddingConfig.couple;
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200/60 bg-[#FDFBF7]">
      <div className="mx-auto max-w-2xl px-6 pt-10 pb-6">
        {/* Couple names */}
        <div className="text-center">
          <Link
            href="/12"
            className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800 transition-colors duration-300 hover:text-neutral-600 sm:text-4xl"
          >
            {person1.firstName}
            <span className="mx-3 text-neutral-300">&amp;</span>
            {person2.firstName}
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="mt-5 hidden items-center justify-center sm:flex">
          {NAV_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <span key={item.href} className="flex items-center">
                {index > 0 && (
                  <span className="mx-4 text-neutral-300 select-none">
                    &middot;
                  </span>
                )}
                <Link
                  href={item.href}
                  className={cn(
                    "font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-neutral-500 transition-all duration-300 hover:text-neutral-800",
                    isActive &&
                      "text-neutral-800 underline decoration-neutral-400 decoration-1 underline-offset-4"
                  )}
                >
                  {item.label}
                </Link>
              </span>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <div className="mt-4 flex justify-center sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="text-neutral-500 transition-colors duration-300 hover:text-neutral-800"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-neutral-200/60 bg-[#FDFBF7]"
            >
              <SheetTitle className="text-center font-[family-name:var(--font-display)] text-2xl font-light tracking-wide text-neutral-800">
                {person1.firstName}
                <span className="mx-2 text-neutral-300">&amp;</span>
                {person2.firstName}
              </SheetTitle>

              {/* Ornamental divider */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="h-px w-10 bg-neutral-200" />
                <span className="text-xs text-neutral-300">&#10045;</span>
                <div className="h-px w-10 bg-neutral-200" />
              </div>

              <nav className="mt-8 flex flex-col items-center space-y-5">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-neutral-500 transition-all duration-300 hover:text-neutral-800",
                        isActive &&
                          "text-neutral-800 underline decoration-neutral-400 decoration-1 underline-offset-4"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
