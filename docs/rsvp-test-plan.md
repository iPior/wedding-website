# Manual RSVP Verification Checklist

Use this after automated tests pass, before release.

## 1) Real Email Delivery
- [ ] Submit RSVP with a real inbox address (test household).
- [ ] Confirm email is received within expected time.
- [ ] Confirm email is not in spam/junk.
- [ ] Confirm sender/from name and address are correct.
- [ ] Confirm no duplicate email was sent.

## 2) Email Client Rendering
Check both RSVP confirmation and RSVP modified emails in:
- [ ] Gmail (web + mobile)
- [ ] Apple Mail (iOS/macOS)
- [ ] Outlook (web/desktop/mobile if available)

Validate:
- [ ] Subject line is correct.
- [ ] Main content is readable and formatted properly.
- [ ] CTA/modify link is visible and clickable.
- [ ] No clipped/truncated layout issues.

## 3) Real Modify-Link Flow
- [ ] Open modify link directly from received email.
- [ ] Change RSVP data and submit.
- [ ] Confirm updated email is received.
- [ ] Confirm old modify link is now invalid.
- [ ] Confirm newest modify link works.

## 4) Polish Language QA
- [ ] Complete RSVP flow in Polish (`/pl/rsvp`).
- [ ] Confirm key UI labels/messages are natural Polish.
- [ ] Confirm confirmation email Polish copy reads naturally.
- [ ] Have a native speaker review tone/wording.

## 5) Cross-Device UI Sanity
Test RSVP pages on:
- [ ] Mobile Safari
- [ ] Mobile Chrome
- [ ] Desktop Chrome/Firefox/Safari

Validate:
- [ ] Search form layout and typing behavior.
- [ ] Attendance button states are clear.
- [ ] Plus-one add/remove UX is usable.
- [ ] Confirmation/decline pages render cleanly.

## 6) Production Environment Config Check
- [ ] `SITE_PASSWORD` set correctly
- [ ] `DATABASE_URL` points to correct DB
- [ ] `NEXT_PUBLIC_SITE_URL` is correct public URL
- [ ] `EMAIL_FROM` is valid/verified
- [ ] `RESEND_API_KEY` is valid for target env

## 7) Final Post-Deploy Smoke
Using a throwaway household:
- [ ] Submit one RSVP (attending).
- [ ] Modify it once (change attendance or plus-one).
- [ ] Verify DB reflects latest state.
- [ ] Verify only expected emails were sent.
