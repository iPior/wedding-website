"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/guests", label: "Guests" },
  { href: "/admin/emails", label: "Emails" },
];

export function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          {/* Monogram */}
          <Link
            href="/admin"
            className="text-base text-muted-foreground"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {person1.firstName[0]}&nbsp;&amp;&nbsp;{person2.firstName[0]}
          </Link>

          {/* Divider */}
          <span className="h-4 w-px bg-border" />

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.25em] transition-colors duration-200 pb-0.5"
                  style={{
                    color: active ? "var(--color-primary)" : "var(--color-muted-foreground)",
                    borderBottom: active ? "1px solid var(--color-accent)" : "1px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-200 hover:text-primary"
          >
            Back to website
          </Link>
          <span className="hidden text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60 sm:block">
            {userEmail}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
