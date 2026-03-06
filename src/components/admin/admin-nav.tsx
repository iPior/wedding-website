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
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          {/* Monogram */}
          <Link
            href="/admin"
            className="text-base text-[var(--color-muted-foreground)]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {person1.firstName[0]}&nbsp;&amp;&nbsp;{person2.firstName[0]}
          </Link>

          {/* Divider */}
          <span className="h-4 w-px bg-[var(--color-border)]" />

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.25em] transition-colors duration-200"
                style={{
                  color: pathname === link.href ? "var(--color-primary)" : "var(--color-muted-foreground)",
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-px bg-[var(--color-accent)]" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]/60 sm:block">
            {userEmail}
          </span>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] transition-colors duration-200 hover:text-[var(--color-primary)]"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
