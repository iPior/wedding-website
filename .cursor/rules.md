You are building an open-source wedding website template.

Read PROJECT.md for the full spec, data model, user stories, and architecture decisions.

Tech stack: Next.js 16 (App Router), Tailwind CSS, ShadCN UI, Supabase, Prisma, Resend + React Email.

Use Bun and not npm.

Key conventions:
- Server Actions for all mutations (no API routes unless necessary)
- Server Components by default, "use client" only when needed
- All wedding content driven by wedding.config.ts at project root
- Mobile-first — design for 375px viewport first
- Use ShadCN components before building custom ones
- Prisma for all DB access — never raw SQL
- All email templates as React components in src/emails/