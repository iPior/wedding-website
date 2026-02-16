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
  { href: "/6", label: "Home" },
  { href: "/6/details", label: "Details" },
  { href: "/6/rsvp", label: "RSVP" },
  { href: "/6/faq", label: "FAQ" },
  { href: "/6/bridal-party", label: "Wedding Party" },
];

export function Nav6() {
  const pathname = usePathname();
  const { person1, person2 } = weddingConfig.couple;
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-[#DDD5CA] bg-[#F7F5F0]">
      <div className="mx-auto max-w-3xl px-6 pt-8 pb-5">
        {/* Logo — couple names in Fraunces italic */}
        <div className="text-center">
          <Link
            href="/6"
            className="font-[family-name:var(--font-display)] text-2xl font-light italic tracking-wide text-[#5B7B5E] transition-colors duration-300 hover:text-[#4a6a4d] sm:text-3xl"
          >
            {person1.firstName}
            <span className="mx-2 text-[#E8C4C8]">&amp;</span>
            {person2.firstName}
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="mt-5 hidden items-center justify-center gap-8 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] text-[#7A7A6E] transition-all duration-300 hover:text-[#5B7B5E]",
                  isActive &&
                    "text-[#5B7B5E] underline decoration-[#5B7B5E]/40 decoration-1 underline-offset-4"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <div className="mt-4 flex justify-center sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="text-[#7A7A6E] transition-colors duration-300 hover:text-[#5B7B5E]"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-[#DDD5CA] bg-[#F7F5F0]"
            >
              <SheetTitle className="text-center font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-[#5B7B5E]">
                {person1.firstName}
                <span className="mx-2 text-[#E8C4C8]">&amp;</span>
                {person2.firstName}
              </SheetTitle>

              {/* Botanical divider */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-[#DDD5CA]" />
                <span className="text-sm text-[#5B7B5E]/50">✿</span>
                <div className="h-px w-10 bg-[#DDD5CA]" />
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
                        "font-[family-name:var(--font-body)] text-sm uppercase tracking-[0.18em] text-[#7A7A6E] transition-all duration-300 hover:text-[#5B7B5E]",
                        isActive &&
                          "text-[#5B7B5E] underline decoration-[#5B7B5E]/40 decoration-1 underline-offset-4"
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
