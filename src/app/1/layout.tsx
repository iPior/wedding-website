import { Cormorant_Garamond, Karla } from "next/font/google";
import { Nav1 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-display",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400"],
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

export default function Variant1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cormorant.variable} ${karla.variable} min-h-screen bg-[#fafaf8] text-neutral-900`}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <Nav1 />
      <main>{children}</main>
      <footer className="pb-16 pt-32">
        <div className="mx-auto max-w-2xl px-6">
          <div
            className="border-t border-neutral-200 pt-12"
            style={{
              animation: "fadeIn 1s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            <p
              className="text-[0.65rem] uppercase tracking-[0.25em] text-neutral-400"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {person1.firstName} & {person2.firstName}
            </p>
            <p
              className="mt-2 text-[0.6rem] tracking-[0.15em] text-neutral-300"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {formattedDate}
            </p>
          </div>
        </div>
      </footer>

      {/* Global keyframes for all variant 1 pages */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes growDown {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }
        @keyframes revealLine {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
