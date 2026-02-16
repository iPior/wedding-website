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
  { href: "/8", label: "Home" },
  { href: "/8/details", label: "Details" },
  { href: "/8/rsvp", label: "RSVP" },
  { href: "/8/faq", label: "FAQ" },
  { href: "/8/bridal-party", label: "Wedding Party" },
];

export function Nav8() {
  const pathname = usePathname();
  const { person1, person2 } = weddingConfig.couple;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D0DDE3] bg-[#F5F8FA]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/8"
          className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[#4A7C8A] transition-colors duration-500 hover:text-[#D4956A] sm:text-2xl"
        >
          {person1.firstName}
          <span className="mx-2 text-[#A8C5D6]">&amp;</span>
          {person2.firstName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.2em] text-[#6B7F8A] transition-all duration-500 hover:text-[#4A7C8A]",
                  isActive &&
                    "border-b-2 border-[#D4956A] pb-0.5 text-[#4A7C8A]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="text-[#6B7F8A] transition-colors duration-300 hover:text-[#4A7C8A]"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-[#D0DDE3] bg-[#F5F8FA]"
            >
              <SheetTitle className="text-center font-[family-name:var(--font-display)] text-xl tracking-wide text-[#4A7C8A]">
                {person1.firstName}
                <span className="mx-2 text-[#A8C5D6]">&amp;</span>
                {person2.firstName}
              </SheetTitle>

              {/* Wave divider */}
              <div className="mt-6 flex justify-center">
                <svg
                  viewBox="0 0 120 12"
                  className="h-3 w-28 text-[#D0DDE3]"
                >
                  <path
                    d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <nav className="mt-8 flex flex-col items-center space-y-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.2em] text-[#6B7F8A] transition-all duration-500 hover:text-[#4A7C8A]",
                        isActive &&
                          "border-b-2 border-[#D4956A] pb-0.5 text-[#4A7C8A]"
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
