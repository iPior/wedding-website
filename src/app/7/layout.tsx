import { Libre_Caslon_Display, Nunito_Sans } from "next/font/google";
import { Nav7 } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

const libreCaslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
  display: "swap",
});

export default function Variant7Layout({
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
      className={`${libreCaslon.variable} ${nunitoSans.variable} relative min-h-screen bg-[#FFF9F5] text-[#3D2E2A]`}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes warmGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.65; }
        }
        @keyframes scaleEntry {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Ambient gradient wash — fixed behind all content */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-24 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,184,125,0.12) 0%, transparent 70%)",
            animation: "warmGlow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,200,0.10) 0%, transparent 70%)",
            animation: "warmGlow 10s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,184,125,0.08) 0%, transparent 70%)",
            animation: "warmGlow 12s ease-in-out infinite 4s",
          }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <Nav7 />

        <main className="mx-auto max-w-3xl px-6 py-20">{children}</main>

        {/* Footer — dark chocolate */}
        <footer className="bg-[#3D2E2A]">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            {/* Gradient divider */}
            <div
              className="mx-auto mb-8 h-px w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C47D5A, #E8B87D, transparent)",
                animation: "fadeIn 1s ease-out forwards",
                opacity: 0,
              }}
            />

            <p
              className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[#C47D5A]"
              style={{
                animation: "fadeInUp 1s ease-out 0.2s forwards",
                opacity: 0,
              }}
            >
              {person1.firstName} & {person2.firstName}
            </p>
            <p
              className="mt-3 font-[family-name:var(--font-body)] text-sm font-light text-[#8A7B72]"
              style={{
                animation: "fadeInUp 1s ease-out 0.4s forwards",
                opacity: 0,
              }}
            >
              {formattedDate}
            </p>
            <p
              className="mt-6 font-[family-name:var(--font-body)] text-xs font-light tracking-wide text-[#8A7B72]/60"
              style={{
                animation: "fadeInUp 1s ease-out 0.6s forwards",
                opacity: 0,
              }}
            >
              Made with love
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
