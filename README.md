# Natalie & Piotr's Wedding Website

A production full-stack wedding website built for our July 2026 wedding. It served more than 200 guests and combined the public event experience with RSVP management, guest administration, and direct email communication in one application.

The project began as an idea for a reusable wedding-site template, but the implementation became intentionally bespoke as the event's content and operational needs evolved. This repository is therefore maintained as a technical case study and reference project, not as a drop-in template.

## Production outcome

The site supported the full guest communication and RSVP period without a reported production incident. It replaced a third-party wedding-site builder with a system that gave us direct control over guest data, household rules, communications, and the overall experience.

Vercel was chosen for managed deployment and CDN-backed delivery. For a time-sensitive event, that kept hosting and infrastructure overhead low while allowing the work to stay focused on application reliability and the guest experience. Sentry monitored client, server, and edge errors in production, while Vercel Analytics provided traffic visibility.

## What the application does

### Guest experience

- Password-protected, mobile-first wedding site with English and Polish localization
- Event details, countdown, schedule, venue information, FAQ, our story, and wedding-party pages
- Locale-aware navigation, content, RSVP flows, and transactional emails

### RSVP system

- Fuzzy guest-name lookup powered by Fuse.js
- Household-based responses so one primary guest can RSVP for an entire invitation
- Per-household plus-one limits and dietary-restriction collection
- Server-side validation with Zod and RSVP deadline enforcement
- Transactional database writes with duplicate-submission and race-condition protection
- UUID-based modification links that rotate after each update
- Localized confirmation and modification emails sent through Resend

RSVP persistence and email delivery are deliberately separated: once the database transaction succeeds, an email failure does not discard the guest's response. Delivery failures are logged and reported to Sentry for follow-up.

### Admin and communications

- Supabase-authenticated admin area
- Dashboard metrics for households, invited guests, attendance, declines, pending responses, response rate, and theoretical capacity
- Attendance and RSVP-timeline charts
- Searchable and filterable guest management with manual create, edit, and delete operations
- Transactional CSV guest import and CSV export
- Mailing-list visibility and broadcast composition
- Deduplicated broadcast delivery through the Resend batch API, in batches of up to 100 recipients

## Technical design

| Area | Implementation |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript, Server Components, and Server Actions |
| UI | Tailwind CSS 4, Radix UI primitives, responsive custom components, and Recharts |
| Data | Supabase PostgreSQL accessed through Prisma |
| Authentication | Shared-password guest gate and Supabase Auth for administration |
| Email | Resend with React Email templates |
| Localization | next-intl with English and Polish content |
| Validation and search | Zod and Fuse.js |
| Observability | Sentry across browser, server, and edge runtimes; structured logs redact sensitive guest fields |
| Analytics and hosting | Vercel Analytics and Vercel deployment with CDN-backed delivery |
| Testing | Vitest unit tests and Playwright end-to-end tests |

The core data model organizes invited people into households. Each household owns its guests, allowed plus-ones, preferred locale, RSVP state, modification token, and mailing-list relationship. This matches the way invitations were issued and avoids forcing every guest to create an account.

## Reliability and privacy decisions

- RSVP updates run inside Prisma transactions so household members, plus-ones, locale preferences, and mailing-list data change together.
- The initial submission uses an in-transaction duplicate check and optimistic update guard to prevent concurrent responses from overwriting one another.
- Modification tokens are unique, unguessable UUIDs and are replaced after use.
- The guest-facing site uses a secure HTTP-only access cookie; the admin dashboard requires a valid Supabase session.
- Sentry is configured without default personally identifiable information, and structured logging redacts names, email addresses, dietary information, passwords, tokens, cookies, and authorization data.
- Production guest records live in PostgreSQL rather than in the repository.

## Testing

Automated coverage focuses on the workflows that could most directly affect guests:

- Attending, declining, split-household, and plus-one RSVP scenarios
- Duplicate submissions, deadline enforcement, and invalid household data
- Modification links, token rotation, and adding or removing plus-ones
- English and Polish confirmation-email behavior
- Admin-adjacent data validation and database persistence

Run the test suites with:

```bash
bun run test
bun run test:e2e
```

## Project status

The wedding has taken place and the production run is complete. The code remains public as a portfolio project demonstrating a real-world, event-driven application whose reliability, data handling, and communication workflows mattered to more than 200 users.
