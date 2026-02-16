import { Italiana, Outfit } from "next/font/google";
import { Nav3 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
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

export default function Variant3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${italiana.variable} ${outfit.variable} min-h-screen bg-neutral-950 text-neutral-900`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Global keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes grow {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes growPartial {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <Nav3 />
      <main>{children}</main>

      {/* Footer — dark, muted, cinematic */}
      <footer className="bg-neutral-950 py-24 text-center">
        <div
          className="mx-auto h-[1px] w-16 bg-neutral-800"
          style={{
            animation: "growPartial 0.8s ease forwards",
          }}
        />
        <p
          className="mt-10 text-[11px] uppercase tracking-[0.3em] text-neutral-600"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {person1.firstName} & {person2.firstName}
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-neutral-700">
          {formattedDate}
        </p>
      </footer>
    </div>
  );
}
