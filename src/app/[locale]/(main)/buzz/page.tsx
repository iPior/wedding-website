import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function BuzzPage() {
  const t = await getTranslations("Buzz");

  return (
    <main className="mx-auto max-w-xl px-6 py-16 flex flex-col items-center text-center">
      <h1
        className="text-3xl md:text-4xl text-[#2c2424] mb-8"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("title")}
      </h1>
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="/images/buzz.jpeg"
          alt="Buzz"
          width={480}
          height={480}
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
