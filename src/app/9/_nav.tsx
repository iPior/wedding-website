"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  { label: "Home", href: "/9" },
  { label: "Details", href: "/9/details" },
  { label: "FAQ", href: "/9/faq" },
  { label: "Bridal Party", href: "/9/bridal-party" },
  { label: "RSVP", href: "/9/rsvp" },
];

const { person1, person2 } = weddingConfig.couple;

function Flourish({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
      <span className="text-[#B8976B] text-lg">&#10087;</span>
      <div className="h-px flex-1 bg-[#DFD0D5]" />
    </div>
  );
}

export function Nav9() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-[#DFD0D5]">
      <div className="mx-auto max-w-3xl px-6 pt-8 pb-6">
        {/* Logo — couple names centered */}
        <div className="text-center">
          <Link
            href="/9"
            className="inline-block transition-colors duration-300 hover:text-[#B8976B]"
          >
            <span
              className="text-2xl italic text-[#8B6B82] sm:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {person1.firstName}
              <span className="mx-2 text-[#C9A8B5]">&amp;</span>
              {person2.firstName}
            </span>
          </Link>
        </div>

        {/* Desktop links — centered, separated by middots */}
        <div className="mt-4 hidden items-center justify-center sm:flex">
          {NAV_ITEMS.map((item, i) => (
            <span key={item.href} className="inline-flex items-center">
              {i > 0 && (
                <span
                  className="mx-4 text-[#DFD0D5]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  &middot;
                </span>
              )}
              <Link
                href={item.href}
                className={cn(
                  "text-[0.75rem] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#8B6B82]",
                  pathname === item.href
                    ? "text-[#8B6B82] underline decoration-[#B8976B] underline-offset-8"
                    : "text-[#7D7274]"
                )}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>

        {/* Mobile trigger */}
        <div className="mt-3 flex justify-center sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Open menu">
              <Menu className="h-5 w-5 text-[#8B6B82]" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-l border-[#DFD0D5] bg-[#FBF7F4] pt-16"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <ul className="flex flex-col items-center gap-0 px-4">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.href} className="w-full">
                    {i > 0 && <Flourish className="my-4 px-4" />}
                    <div
                      className="text-center"
                      style={{
                        animation: "fadeInUp 0.6s ease forwards",
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-sm uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#8B6B82]",
                          pathname === item.href
                            ? "text-[#8B6B82]"
                            : "text-[#7D7274]"
                        )}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.label}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
