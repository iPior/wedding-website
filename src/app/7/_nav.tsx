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
  { href: "/7", label: "Home" },
  { href: "/7/details", label: "Details" },
  { href: "/7/rsvp", label: "RSVP" },
  { href: "/7/faq", label: "FAQ" },
  { href: "/7/bridal-party", label: "Wedding Party" },
];

export function Nav7() {
  const pathname = usePathname();
  const { person1, person2 } = weddingConfig.couple;
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#FFF9F5]">
      <div className="mx-auto max-w-3xl px-6 pt-10 pb-6">
        {/* Logo */}
        <div className="text-center">
          <Link
            href="/7"
            className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#C47D5A] transition-colors duration-500 hover:text-[#E8B87D] sm:text-3xl"
          >
            {person1.firstName}
            <span className="mx-3 text-[#D4A8C8]">&amp;</span>
            {person2.firstName}
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="mt-6 hidden items-center justify-center gap-9 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-[family-name:var(--font-body)] text-xs font-normal uppercase tracking-[0.16em] text-[#8A7B72] transition-all duration-400 hover:text-[#C47D5A]",
                  isActive &&
                    "text-[#C47D5A] underline decoration-[#E8B87D] decoration-[1.5px] underline-offset-8"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <div className="mt-5 flex justify-center sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="text-[#8A7B72] transition-colors duration-300 hover:text-[#C47D5A]"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-[#EDD8CC] bg-[#FFF9F5]"
            >
              <SheetTitle className="text-center font-[family-name:var(--font-display)] text-xl tracking-wide text-[#C47D5A]">
                {person1.firstName}
                <span className="mx-2 text-[#D4A8C8]">&amp;</span>
                {person2.firstName}
              </SheetTitle>

              {/* Gradient divider */}
              <div className="mt-6 flex items-center justify-center">
                <div
                  className="h-px w-24"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #C47D5A, #E8B87D, transparent)",
                  }}
                />
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
                        "font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.16em] text-[#8A7B72] transition-all duration-400 hover:text-[#C47D5A]",
                        isActive &&
                          "text-[#C47D5A] underline decoration-[#E8B87D] decoration-[1.5px] underline-offset-8"
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
