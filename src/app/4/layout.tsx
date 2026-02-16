import { Space_Mono, IBM_Plex_Sans } from "next/font/google";
import { Nav4 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export default function Variant4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { person1, person2 } = weddingConfig.couple;
  const date = new Date(weddingConfig.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div
      className={`${spaceMono.variable} ${ibmPlexSans.variable} min-h-screen bg-white font-[family-name:var(--font-body)] font-light text-neutral-900 antialiased`}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Nav4 />

      <main className="mx-auto max-w-3xl px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="font-[family-name:var(--font-display)] text-[10px] uppercase tracking-[0.15em] text-neutral-300">
              {person1.lastName} / {person2.lastName}
            </p>
            <p className="font-[family-name:var(--font-display)] text-[10px] tabular-nums text-neutral-300">
              {formattedDate}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
