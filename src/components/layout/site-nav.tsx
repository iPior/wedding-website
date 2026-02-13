import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/faq", label: "FAQ" },
  { href: "/bridal-party", label: "Bridal Party" },
];

export function SiteNav() {
  return (
    <header className="border-b border-zinc-200">
      <nav className="mx-auto flex max-w-3xl items-center gap-4 overflow-x-auto px-4 py-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
