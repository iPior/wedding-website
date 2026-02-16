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
  { label: "Home", href: "/3" },
  { label: "Details", href: "/3/details" },
  { label: "RSVP", href: "/3/rsvp" },
  { label: "FAQ", href: "/3/faq" },
  { label: "Bridal Party", href: "/3/bridal-party" },
];

const { person1, person2 } = weddingConfig.couple;

export function Nav3() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-neutral-950">
      {/* Logo row — centered */}
      <div className="pt-10 pb-4 text-center">
        <Link
          href="/3"
          className="inline-block text-[11px] uppercase tracking-[0.3em] text-neutral-300 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {person1.firstName} & {person2.firstName}
        </Link>
      </div>

      {/* Desktop links — centered, separated by pipes */}
      <div className="hidden justify-center pb-10 sm:flex">
        <ul className="flex items-center">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href} className="flex items-center">
              {i > 0 && (
                <span className="mx-5 text-neutral-700 select-none">|</span>
              )}
              <Link
                href={item.href}
                className={cn(
                  "text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 hover:text-white",
                  pathname === item.href
                    ? "text-white"
                    : "text-neutral-500"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile hamburger */}
      <div className="flex justify-end px-6 pb-6 sm:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger aria-label="Open menu">
            <Menu className="h-5 w-5 text-neutral-400" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-none bg-neutral-950 pt-24"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-8 text-neutral-500 transition-colors hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <ul className="flex flex-col items-center gap-10">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-[13px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-white",
                      pathname === item.href
                        ? "text-white"
                        : "text-neutral-500"
                    )}
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
