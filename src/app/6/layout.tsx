import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Nav6 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export default function Variant6Layout({
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
      className={`${fraunces.variable} ${sourceSans.variable} min-h-screen bg-[#F7F5F0] text-neutral-800`}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scaleX(0.3); }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}</style>

      <Nav6 />

      <main className="mx-auto max-w-3xl px-6 py-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#5B7B5E]/20 bg-[#F7F5F0]">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          {/* Botanical ornament */}
          <div
            className="flex items-center justify-center gap-3"
            style={{
              animation: "scaleIn 1.2s ease-out forwards",
              opacity: 0,
            }}
          >
            <div className="h-px w-14 bg-[#5B7B5E]/20" />
            <span className="text-base text-[#5B7B5E]/40">✿</span>
            <div className="h-px w-14 bg-[#5B7B5E]/20" />
          </div>

          <p
            className="mt-6 font-[family-name:var(--font-display)] text-xl font-light italic tracking-wide text-[#5B7B5E]"
            style={{
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            {person1.firstName} & {person2.firstName}
          </p>
          <p
            className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#7A7A6E]"
            style={{
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
        </div>
      </footer>
    </div>
  );
}
