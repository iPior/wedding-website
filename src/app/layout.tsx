import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { weddingConfig } from "../../wedding.config";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const { person1, person2 } = weddingConfig.couple;

export const metadata: Metadata = {
  title: `${person1.firstName} & ${person2.firstName} — Wedding`,
  description: `Wedding website for ${person1.firstName} ${person1.lastName} & ${person2.firstName} ${person2.lastName}`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
