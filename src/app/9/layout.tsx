import { Bodoni_Moda, Crimson_Pro } from "next/font/google";
import { Nav9 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const { person1, person2 } = weddingConfig.couple;
const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function Variant9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bodoni.variable} ${crimson.variable} min-h-screen bg-[#FBF7F4] text-[#3C2F35]`}
      style={{ fontFamily: "var(--font-body), serif" }}
    >
      <Nav9 />
      <main>{children}</main>

      {/* Footer — deep plum */}
      <footer className="bg-[#3C2F35] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          {/* Flourish */}
          <div
            className="flex items-center justify-center gap-3 mb-8"
            style={{
              animation: "fadeIn 1s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <div className="h-px w-16 bg-[#C9A8B5]/30" />
            <span className="text-[#B8976B] text-lg">&#10087;</span>
            <div className="h-px w-16 bg-[#C9A8B5]/30" />
          </div>

          <p
            className="text-xl italic text-[#C9A8B5]"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeIn 1s ease forwards",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            {person1.firstName}
            <span className="mx-2 text-[#B8976B]">&amp;</span>
            {person2.firstName}
          </p>
          <p
            className="mt-3 text-sm italic text-[#C9A8B5]/60"
            style={{
              fontFamily: "var(--font-body)",
              animation: "fadeIn 1s ease forwards",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
          <p
            className="mt-6 text-xs tracking-[0.1em] text-[#C9A8B5]/40"
            style={{
              fontFamily: "var(--font-body)",
              animation: "fadeIn 1s ease forwards",
              animationDelay: "0.6s",
              opacity: 0,
            }}
          >
            Made with love
          </p>
        </div>
      </footer>

      {/* Global keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
