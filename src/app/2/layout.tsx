import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { Nav2 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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

export default function Variant2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSerifDisplay.variable} ${dmSans.variable} min-h-screen bg-neutral-50 font-[family-name:var(--font-body)] font-light text-neutral-900`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(16px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `,
        }}
      />

      <Nav2 />

      <main className="mx-auto max-w-5xl px-6 py-14">{children}</main>

      <footer className="border-t border-neutral-100 py-16 text-center">
        <p className="font-[family-name:var(--font-display)] text-sm tracking-wide text-neutral-400">
          {person1.firstName} & {person2.firstName}
        </p>
        <p className="mt-1.5 text-[11px] font-light tracking-widest text-neutral-300">
          {formattedDate}
        </p>
      </footer>
    </div>
  );
}
