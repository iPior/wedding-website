"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { weddingConfig } from "../../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16"
      style={{ backgroundColor: "var(--color-background)", fontFamily: "var(--font-lato), sans-serif" }}
    >
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

        {/* Monogram */}
        <div
          style={{ animation: "fadeInUp 0.8s ease forwards", opacity: 0 }}
        >
          <span
            className="text-3xl text-[var(--color-muted-foreground)]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {person1.firstName[0]}&nbsp;&amp;&nbsp;{person2.firstName[0]}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-5 overflow-hidden">
          <div
            className="mx-auto h-px bg-[var(--color-accent)]"
            style={{
              animation: "grow 0.7s ease forwards",
              animationDelay: "0.3s",
              width: 0,
              maxWidth: "3rem",
            }}
          />
        </div>

        {/* Label */}
        <p
          className="mt-5 text-xs font-light uppercase tracking-[0.4em] text-[var(--color-muted-foreground)]"
          style={{ animation: "fadeInUp 0.8s ease forwards", animationDelay: "0.4s", opacity: 0 }}
        >
          Admin
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4 text-left"
          style={{ animation: "fadeInUp 0.8s ease forwards", animationDelay: "0.6s", opacity: 0 }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="mt-2 w-full border-b border-[var(--color-accent)] bg-transparent pb-3 text-sm tracking-wide text-[var(--color-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--color-muted-foreground)]/40 focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full border-b border-[var(--color-accent)] bg-transparent pb-3 text-sm tracking-wide text-[var(--color-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--color-muted-foreground)]/40 focus:border-[var(--color-primary)]"
            />
          </div>

          {error && (
            <p className="text-xs uppercase tracking-[0.2em] text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[var(--color-background)] transition-colors duration-300 hover:bg-[var(--color-accent)] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
