export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className="mx-auto max-w-5xl px-4 py-8">{children}</section>;
}
