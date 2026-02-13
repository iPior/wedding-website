# Wedding Website v2

Open-source wedding website template built with Next.js, Tailwind, Supabase, Prisma, and Resend.

## Quick Start (Bun)

```bash
bun install
bun run dev
```

App runs at `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill values.

## Available Scripts

- `bun run dev` - start Next.js dev server
- `bun run build` - production build
- `bun run start` - run production server
- `bun run lint` - lint project
- `bun run test` - run Vitest
- `bun run test:e2e` - run Playwright tests
- `bun run prisma:generate` - generate Prisma client
- `bun run prisma:migrate` - run Prisma migration
- `bun run prisma:seed` - seed local database
- `bun run email:dev` - preview React Email templates

## Notes

- `PROJECT.md` contains the full product specification and roadmap.
- Initial route and folder skeleton has been scaffolded based on that spec.
