import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function BuzzPage() {
  const t = await getTranslations("Buzz");

  return (
    <main className="mx-auto max-w-xl px-6 py-16 flex flex-col items-center text-center">
      <h1
        className="text-3xl md:text-4xl text-primary mb-8"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {t("title")}
      </h1>
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="/images/buzz.jpeg"
          alt="Buzz"
          width={360}
          height={360}
          sizes="(max-width: 768px) 90vw, 480px"
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
