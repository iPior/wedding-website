"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { weddingConfig } from "../../../wedding.config";

const NAV_ITEMS = [
  { label: "Home", href: "/2" },
  { label: "Details", href: "/2/details" },
  { label: "RSVP", href: "/2/rsvp" },
  { label: "FAQ", href: "/2/faq" },
  { label: "Bridal Party", href: "/2/bridal-party" },
];

const { person1, person2 } = weddingConfig.couple;

export function Nav2() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/75",
        scrolled
          ? "border-neutral-200 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
          : "border-neutral-100 shadow-none"
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/2"
          className="font-[family-name:var(--font-display)] text-xl tracking-tight text-neutral-900"
        >
          {person1.firstName}{" "}
          <span className="text-neutral-300">&</span>{" "}
          {person2.firstName}
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "font-[family-name:var(--font-body)] text-[13px] tracking-wide transition-colors duration-200 hover:text-neutral-900",
                    isActive
                      ? "font-medium text-neutral-900"
                      : "font-normal text-neutral-400"
                  )}
                >
                  {item.label}
                </Link>
                {isActive && (
                  <div className="absolute -bottom-[18px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-neutral-900" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5 text-neutral-500" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 border-l border-neutral-100 bg-white pt-14"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 font-[family-name:var(--font-body)] text-[15px] tracking-wide transition-colors duration-200",
                        isActive
                          ? "bg-neutral-50 font-medium text-neutral-900"
                          : "font-normal text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700"
                      )}
                    >
                      {isActive && (
                        <span className="h-1 w-1 rounded-full bg-neutral-900" />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
