import { Poiret_One, Josefin_Sans } from "next/font/google";
import { Nav10 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const poiretOne = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export default function Variant10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { person1, person2 } = weddingConfig.couple;
  const date = new Date(weddingConfig.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`${poiretOne.variable} ${josefinSans.variable} min-h-screen bg-[#F9F7F2] text-[#2D4A3E]`}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes growLine {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <Nav10 />

      <main>{children}</main>

      {/* Footer — dark forest */}
      <footer className="bg-[#1A2E26]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          {/* Gold geometric divider */}
          <div
            className="mx-auto mb-8 flex items-center justify-center gap-4"
            style={{
              animation: "fadeIn 0.6s ease-out forwards",
              opacity: 0,
            }}
          >
            <div className="h-px w-12 bg-[#C9A84C]/40" />
            <div className="size-2 rotate-45 border border-[#C9A84C]/60" />
            <div className="size-3 rotate-45 border border-[#C9A84C]/40" />
            <div className="size-2 rotate-45 border border-[#C9A84C]/60" />
            <div className="h-px w-12 bg-[#C9A84C]/40" />
          </div>

          <p
            className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-[0.3em] text-[#B5CDC3]"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            {person1.firstName} & {person2.firstName}
          </p>
          <p
            className="mt-2 font-[family-name:var(--font-body)] text-sm font-light tracking-wider text-[#6B7B74]"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
          <p
            className="mt-8 font-[family-name:var(--font-body)] text-xs font-light tracking-widest text-[#6B7B74]/50"
            style={{
              animation: "fadeIn 0.6s ease-out forwards",
              animationDelay: "0.45s",
              opacity: 0,
            }}
          >
            Crafted with love & geometric precision
          </p>
        </div>
      </footer>
    </div>
  );
}
