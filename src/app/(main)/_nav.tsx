"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

const links = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/details", label: "Details" },
  { href: "/faq", label: "FAQ" },
  { href: "/bridal-party", label: "Party" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="relative z-20">
      <div className="flex items-center justify-between px-8 md:px-16 py-10">
        {/* Couple names — small-caps */}
        <Link
          href="/"
          className="text-sm tracking-[0.5em] uppercase text-[#2c2424]"
          style={{ fontVariant: "small-caps" }}
        >
          {person1.firstName} & {person2.firstName}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-12">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-xs tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#2c2424] ${
                isActive(l.href) ? "text-[#2c2424]" : "text-[#8a7f7f]"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#d4a0b0]" />
              )}
            </Link>
          ))}
          <Link
            href="/rsvp"
            className="text-xs tracking-[0.3em] uppercase text-[#fff8f8] bg-[#2c2424] px-5 py-2.5 transition-colors duration-300 hover:bg-[#d4a0b0]"
          >
            RSVP
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#2c2424]"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full bg-[#fff8f8]/95 backdrop-blur-sm border-t border-[#f0e0e4] z-50">
          <div className="flex flex-col items-center gap-6 py-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-xs tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#2c2424] ${
                  isActive(l.href)
                    ? "text-[#2c2424] underline decoration-[#d4a0b0] underline-offset-4"
                    : "text-[#8a7f7f]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/rsvp"
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.3em] uppercase text-[#fff8f8] bg-[#2c2424] px-8 py-2.5 transition-colors duration-300 hover:bg-[#d4a0b0]"
            >
              RSVP
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
