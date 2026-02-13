type Props = {
  params: Promise<{ token: string }>;
};

export default async function ModifyRsvpPage({ params }: Props) {
  const { token } = await params;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Modify RSVP</h1>
      <p className="mt-2 text-zinc-600">
        Modify token: <code>{token}</code>
      </p>
    </main>
  );
}
