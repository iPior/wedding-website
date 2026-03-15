# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js 16 App Router project. Application routes live in `src/app`, including localized public pages under `src/app/[locale]/(main)` and admin pages under `src/app/admin`. Reusable UI and feature components live in `src/components`, server actions in `src/actions`, and shared utilities/integrations in `src/lib` and `src/i18n`. Email templates are in `src/emails`. Database schema, migrations, and seed logic live in `prisma/`. Static assets belong in `public/`. Tests are split into `tests/unit`, `tests/integration`, and `tests/e2e`.

## Build, Test, and Development Commands
Use Bun for local work:

- `bun install` installs dependencies.
- `bun run dev` starts the app at `http://localhost:3000`.
- `bun run build` runs `prisma generate` and builds production assets.
- `bun run start` serves the production build.
- `bun run lint` runs ESLint with the Next.js core-web-vitals rules.
- `bun run test` runs Vitest unit and integration tests.
- `bun run test:e2e` runs Playwright tests from `tests/e2e`.
- `bun run prisma:migrate` applies local schema changes.
- `bun run prisma:seed` seeds the local database.
- `bun run email:dev` previews React Email templates from `src/emails`.

## Coding Style & Naming Conventions
TypeScript is strict; keep code type-safe and avoid `any`. Follow the existing style: 2-space indentation, semicolons, double quotes, and import aliases from `@/`. Use PascalCase for React components, camelCase for functions/variables, and kebab-case for component filenames such as `countdown-timer.tsx`. Keep route files in Next.js conventions: `page.tsx`, `layout.tsx`, `error.tsx`, and `route.ts`.

## Testing Guidelines
Place unit and integration coverage in `tests/unit/*.test.ts` and `tests/integration/*.test.ts`; Vitest is already configured to include those patterns. Put browser flows in `tests/e2e/*.spec.ts`. Add or update tests for changes to RSVP flows, locale logic, admin actions, and guest data handling. Run `bun run test` before opening a PR, and run `bun run test:e2e` for route or form changes.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects like `Fix help button positioning` or `Add fade-in animations to RSVP routes`. Keep commits focused and descriptive. Pull requests should explain user-facing impact, mention schema or env changes, link the relevant issue if one exists, and include screenshots for visual updates across localized or mobile views.

## Security & Configuration Tips
Copy `.env.example` to `.env.local` and never commit secrets. Required integrations include Supabase, Postgres/Prisma, Resend, and optional Sentry. Treat guest data as sensitive: avoid logging personal details, and verify redaction still works when touching `src/lib/logger.ts` or admin/export features.
