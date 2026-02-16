"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { weddingConfig } from "../../../wedding.config";

const NAV_ITEMS = [
  { label: "Home", href: "/1" },
  { label: "Details", href: "/1/details" },
  { label: "FAQ", href: "/1/faq" },
  { label: "Bridal Party", href: "/1/bridal-party" },
  { label: "RSVP", href: "/1/rsvp" },
];

const { person1, person2 } = weddingConfig.couple;

export function Nav1() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-6 pt-10 pb-6">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        {/* Site mark — couple initials */}
        <Link
          href="/1"
          className="text-[0.65rem] uppercase tracking-[0.3em] text-neutral-400 transition-colors duration-300 hover:text-neutral-900"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {person1.firstName[0]}.{person2.firstName[0]}.
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 sm:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 hover:text-neutral-900",
                  pathname === item.href
                    ? "text-neutral-900 underline underline-offset-4 decoration-neutral-300"
                    : "text-neutral-400"
                )}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="sm:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4 text-neutral-500" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 border-l border-neutral-100 bg-[#fafaf8] pt-16"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <ul className="flex flex-col gap-8 px-4">
              {NAV_ITEMS.map((item, i) => (
                <li
                  key={item.href}
                  style={{
                    animation: "slideInLeft 0.4s ease forwards",
                    animationDelay: `${i * 0.06}s`,
                    opacity: 0,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:text-neutral-900",
                      pathname === item.href
                        ? "text-neutral-900"
                        : "text-neutral-400"
                    )}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
