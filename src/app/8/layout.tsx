import { Tenor_Sans, Raleway } from "next/font/google";
import { Nav8 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export default function Variant8Layout({
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
      className={`${tenorSans.variable} ${raleway.variable} min-h-screen text-[#1E3A42]`}
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, #EDF3F6 0%, #F5F8FA 40%, #FFF5EE 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes waveFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

      <Nav8 />

      <main>{children}</main>

      {/* Footer — deep ocean */}
      <footer className="bg-[#1E3A42]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          {/* Wave divider */}
          <svg
            viewBox="0 0 200 16"
            className="mx-auto mb-8 h-4 w-40 text-[#4A7C8A]/40"
            style={{
              animation: "waveFloat 3s ease-in-out infinite",
            }}
          >
            <path
              d="M0,8 Q25,0 50,8 T100,8 T150,8 T200,8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>

          <p
            className="font-[family-name:var(--font-display)] text-xl tracking-wide text-[#A8C5D6]"
            style={{
              animation: "fadeInUp 0.9s ease-in-out forwards",
              opacity: 0,
            }}
          >
            {person1.firstName} & {person2.firstName}
          </p>
          <p
            className="mt-2 font-[family-name:var(--font-body)] text-sm font-light text-[#6B7F8A]"
            style={{
              animation: "fadeInUp 0.9s ease-in-out forwards",
              animationDelay: "0.15s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
          <p
            className="mt-6 font-[family-name:var(--font-body)] text-xs font-light tracking-wider text-[#6B7F8A]/60"
            style={{
              animation: "fadeIn 0.9s ease-in-out forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Made with love by the shore
          </p>
        </div>
      </footer>
    </div>
  );
}
