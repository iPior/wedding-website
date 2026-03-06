"use client";

import { useTranslations } from "next-intl";

type PasswordFormProps = {
  errorMessage?: string;
};

export function PasswordForm({ errorMessage }: PasswordFormProps) {
  const t = useTranslations("Password");

  return (
    <form action="/auth/unlock" method="post" className="mt-8 space-y-6">
      <div className="relative">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder={t("placeholder")}
          className="w-full border-b border-[var(--color-accent)] bg-transparent pb-3 pt-1 text-center text-sm uppercase tracking-[0.3em] text-[var(--color-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--color-muted-foreground)]/50 focus:border-[var(--color-primary)]"
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="text-xs uppercase tracking-[0.2em] text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full bg-[var(--color-primary)] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[var(--color-background)] transition-colors duration-300 hover:bg-[var(--color-accent)]"
      >
        {t("enter")}
      </button>
    </form>
  );
}
