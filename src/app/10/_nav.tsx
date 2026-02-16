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
  { href: "/10", label: "Home" },
  { href: "/10/details", label: "Details" },
  { href: "/10/rsvp", label: "RSVP" },
  { href: "/10/faq", label: "FAQ" },
  { href: "/10/bridal-party", label: "Wedding Party" },
];

function DiamondOrnament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-px w-8 bg-[#C9A84C]/50" />
      <div className="size-2 rotate-45 border border-[#C9A84C]" />
      <div className="h-px w-8 bg-[#C9A84C]/50" />
    </div>
  );
}

export function Nav10() {
  const pathname = usePathname();
  const { person1, person2 } = weddingConfig.couple;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/10"
          className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.3em] text-[#2D4A3E] transition-colors duration-500 hover:text-[#C9A84C] sm:text-2xl"
        >
          {person1.firstName}
          <span className="mx-2 text-[#C9A84C]">&amp;</span>
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
                  "font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.15em] text-[#6B7B74] transition-all duration-500 hover:text-[#2D4A3E]",
                  isActive &&
                    "border-b-2 border-[#C9A84C] pb-0.5 text-[#2D4A3E]"
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
                className="text-[#6B7B74] transition-colors duration-300 hover:text-[#2D4A3E]"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-[#C5D5CD] bg-[#F9F7F2]"
            >
              <SheetTitle className="text-center font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.3em] text-[#2D4A3E]">
                {person1.firstName}
                <span className="mx-2 text-[#C9A84C]">&amp;</span>
                {person2.firstName}
              </SheetTitle>

              {/* Diamond ornament */}
              <div className="mt-6 flex justify-center">
                <DiamondOrnament />
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
                        "font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.15em] text-[#6B7B74] transition-all duration-500 hover:text-[#2D4A3E]",
                        isActive &&
                          "border-b-2 border-[#C9A84C] pb-0.5 text-[#2D4A3E]"
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
      {/* Gold accent line below nav */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
    </header>
  );
}
