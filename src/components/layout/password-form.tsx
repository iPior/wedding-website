type PasswordFormProps = {
  errorMessage?: string;
};

export function PasswordForm({ errorMessage }: PasswordFormProps) {
  return (
    <form action="/auth/unlock" method="post" className="mt-6 space-y-4">
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base outline-none ring-zinc-400 transition focus:ring-2"
          placeholder="Enter your invite password"
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-md bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        Enter site
      </button>
    </form>
  );
}
