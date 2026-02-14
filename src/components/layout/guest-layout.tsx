import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";

export function GuestLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <SiteNav />
      <main className={cn("mx-auto max-w-3xl px-4 py-12", className)}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
