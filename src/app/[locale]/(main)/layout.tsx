import { Playfair_Display, Lato } from "next/font/google";
import { Nav } from "./_nav";
import { PageTransition } from "./_page-transition";
import { Footer } from "./_footer";
import { BridalPartyPreload } from "@/components/bridal-party-preload";
import { weddingConfig } from "../../../../wedding.config";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const { person1, person2 } = weddingConfig.couple;

export const metadata = {
  title: `${person1.firstName} & ${person2.firstName} — Wedding`,
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${lato.variable} min-h-screen bg-background text-primary`}
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
      {/* Watercolor wash fixed background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ willChange: "transform" }}>
        {/* Top-right blob */}
        <div
          className="absolute w-[60vw] h-[60vh] rounded-full blur-[80px] md:blur-[100px]"
          style={{
            top: "-10%",
            right: "-10%",
            background:
              "var(--gradient-glow-rose)",
          }}
        />
        {/* Bottom-left blob */}
        <div
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[80px] md:blur-[100px]"
          style={{
            bottom: "-10%",
            left: "-10%",
            background:
              "var(--gradient-glow-olive)",
          }}
        />
        {/* Center-left blob */}
        <div
          className="absolute w-[30vw] h-[30vh] rounded-full blur-[80px] md:blur-[100px]"
          style={{
            top: "40%",
            left: "10%",
            background:
              "var(--gradient-glow-soft)",
          }}
        />
      </div>

      <BridalPartyPreload />

      {/* Page content above watercolor layer */}
      <div className="relative z-10">
        <Nav />
        <PageTransition>{children}</PageTransition>

        <Footer />
      </div>
    </div>
  );
}
