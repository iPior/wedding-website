import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/admin-nav";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div
      className={`${lato.variable} min-h-screen bg-[#fff8f8] text-[#2c2424]`}
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      <AdminNav userEmail={user.email ?? ""} />
      <section className="mx-auto max-w-5xl px-6 py-10">{children}</section>
    </div>
  );
}
