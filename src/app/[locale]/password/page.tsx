import { PasswordForm } from "@/components/layout/password-form";
import { LanguageModal } from "@/components/language-modal";
import { weddingConfig } from "../../../../wedding.config";
import { getTranslations } from "next-intl/server";

type PasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const ERROR_MAP: Record<string, string> = {
  invalid: "invalidPassword",
  misconfigured: "misconfigured",
};

const { person1, person2 } = weddingConfig.couple;

export default async function PasswordPage({ searchParams }: PasswordPageProps) {
  const { error } = await searchParams;
  const t = await getTranslations("Password");
  const tErr = await getTranslations("Errors");

  const errorKey = error ? ERROR_MAP[error] : undefined;
  const errorMessage = errorKey ? tErr(errorKey) : error ? tErr("UNKNOWN") : undefined;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-lato), sans-serif" }}
    >
      <LanguageModal />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>

      {/* Watercolor blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "60vw", height: "60vh",
            top: "-10%", right: "-10%",
            background: "var(--gradient-glow-rose)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "50vw", height: "50vh",
            bottom: "-10%", left: "-10%",
            background: "var(--gradient-glow-olive)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: "30vw", height: "30vh",
            top: "40%", left: "10%",
            background: "var(--gradient-glow-soft)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm text-center">

        {/* Eyebrow */}
        <p
          className="text-xs font-light uppercase tracking-[0.4em] text-muted-foreground"
          style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
        >
          {t("youreInvited")}
        </p>

        {/* Names */}
        <h1
          className="mt-6 text-5xl uppercase leading-[1.1] tracking-[0.25em] text-primary"
          style={{
            fontFamily: "var(--font-playfair), serif",
            animation: "fadeInUp 0.9s ease forwards",
            animationDelay: "0.15s",
            opacity: 0,
          }}
        >
          {person1.firstName}
          <span className="block text-[0.5em] tracking-[0.5em] text-accent">&</span>
          {person2.firstName}
        </h1>

        {/* Divider */}
        <div className="mx-auto mt-8 overflow-hidden">
          <div
            className="mx-auto h-[2px] bg-accent"
            style={{
              animation: "grow 0.7s ease forwards",
              animationDelay: "0.6s",
              width: 0,
              maxWidth: "4rem",
            }}
          />
        </div>

        {/* Instruction */}
        <p
          className="mt-8 text-xs font-light uppercase tracking-[0.3em] text-muted-foreground"
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          {t("enterPassword")}
        </p>

        {/* Form */}
        <div
          style={{
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "1s",
            opacity: 0,
          }}
        >
          <PasswordForm errorMessage={errorMessage} />
        </div>
      </div>
    </main>
  );
}
