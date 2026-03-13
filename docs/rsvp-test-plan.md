# RSVP Manual Testing Guide

Covers every household type, edge case, error state, and the modify flow. Run before any RSVP-related deploy.

---

## Setup Notes

- Seed the dev database with representative households before each run: `bun run prisma:seed`
- Dev server: `bun run dev` → http://localhost:3000
- Email preview (optional): `bun run email:dev` → http://localhost:3001
- To reset a household between test cases, either re-seed or manually clear `rsvp_submitted_at` / `rsvp_token` and delete related `plus_ones` rows via Prisma Studio (`bunx prisma studio`)
- Locale toggle is available via the flag button in the navbar

---

## Initial Submission Cases

### TC-01 — Solo guest, attending, with dietary restriction

**Setup:** Household with 1 guest (`isPrimary = true`), `maxPlusOnes = 0`.

**Steps:**
1. Navigate to `/rsvp`.
2. Search for the guest by first + last name.
3. Click the guest card.
4. On the RSVP form, select **"Yes, I'll be there"**.
5. Enter a valid email address.
6. Fill in the dietary restrictions field (e.g. "gluten-free").
7. Submit.

**Expected:**
- Redirected to `/rsvp/confirmed?attending=true`.
- Page shows ceremony and reception venue cards + "View Details" button.
- No plus-one section was shown on the form.
- Confirmation email sent to the provided address; dietary note is visible in the email body.
- `guests.attending = YES`, `guests.dietary_restrictions = 'gluten-free'`, `guests.rsvp_submitted_at` is set in DB.

---

### TC-02 — Solo guest, declining

**Setup:** Household with 1 guest (`isPrimary = true`), `maxPlusOnes = 0`.

**Steps:**
1. Navigate to `/rsvp` and find the guest.
2. Select **"Unable to attend"**.
3. Email is optional — leave blank or fill in.
4. Submit.

**Expected:**
- Redirected to `/rsvp/confirmed?attending=false`.
- Page shows a decline message and "Back to home" button; no venue cards shown.
- Decline confirmation email sent (if email provided).
- `guests.attending = NO` in DB.

---

### TC-03 — Couple, both attending, one with dietary restriction

**Setup:** Household with 2 guests (both `isPrimary = false` except the primary), `maxPlusOnes = 0`.

**Steps:**
1. Search for the primary guest and open the form.
2. For **Guest 1 (primary):** select attending, enter email, no dietary restriction.
3. For **Guest 2:** select attending, enter dietary restriction (e.g. "vegan").
4. Submit.

**Expected:**
- Redirected to confirmed page with `attending=true`.
- Both guests show `attending = YES` in DB.
- Guest 2 has `dietary_restrictions = 'vegan'`.
- Single confirmation email sent (to primary's address) listing both guests.

---

### TC-04 — Couple, split attendance (one yes / one no)

**Setup:** Household with 2 guests, `maxPlusOnes = 0`.

**Steps:**
1. Find primary guest, open form.
2. Primary guest: select **attending**.
3. Second guest: select **not attending**.
4. Enter email for primary. Submit.

**Expected:**
- Confirmed page shows `attending=true` (primary is attending).
- DB: primary `attending = YES`, second guest `attending = NO`.
- Confirmation email reflects partial attendance.

---

### TC-05 — Couple, both declining

**Setup:** Household with 2 guests, `maxPlusOnes = 0`.

**Steps:**
1. Find primary guest.
2. Both guests: select **not attending**.
3. Submit (email optional).

**Expected:**
- Redirected to `/rsvp/confirmed?attending=false`.
- Both guests have `attending = NO` in DB.
- Decline email sent if address provided.

---

### TC-06 — Solo+Guest allowance: attends and brings max plus ones with dietary restriction

**Setup:** Household with 1 primary guest, `maxPlusOnes = 1` (or higher — adjust based on seed data).

**Steps:**
1. Find primary guest, open form.
2. Select attending.
3. In the plus-one section, click **"Add plus one"** until the button disappears (max reached).
4. Fill in plus-one first name, last name, and a dietary restriction.
5. Enter email. Submit.

**Expected:**
- Plus-one rows appear in `plus_ones` table with correct `household_id`, `confirmed_by`, and dietary info.
- "Add plus one" button is disabled/hidden once `maxPlusOnes` is reached.
- Confirmation email lists the plus one and their dietary restriction.

---

### TC-07 — Solo+Guest allowance: attends but adds no plus ones

**Setup:** Household with 1 primary guest, `maxPlusOnes ≥ 1`.

**Steps:**
1. Find primary guest, open form.
2. Select attending.
3. Leave the plus-one section empty (do not add any).
4. Enter email. Submit.

**Expected:**
- No rows inserted into `plus_ones`.
- Confirmation email has no plus-one section.
- Guest `attending = YES`.

---

### TC-08 — Couple+Guest allowance: mixed attendance + plus one

**Setup:** Household with 2 guests (primary + partner), `maxPlusOnes = 1`.

**Steps:**
1. Find primary guest, open form.
2. Primary: attending. Partner: not attending.
3. Add 1 plus one (first + last name).
4. Submit.

**Expected:**
- Primary `attending = YES`, partner `attending = NO`.
- 1 row in `plus_ones` linked to primary's `confirmed_by`.
- Confirmation email reflects the mix.

---

### TC-09 — Family (3+ guests), all attending

**Setup:** Household with 3 or more guests, `maxPlusOnes = 0`.

**Steps:**
1. Find primary guest, open form.
2. Mark every guest as attending.
3. Add dietary info for at least one guest.
4. Submit.

**Expected:**
- All guests have `attending = YES`.
- All dietary restrictions persisted.
- Single email covers all household members.

---

### TC-10 — Family, all declining

**Setup:** Same household as TC-09.

**Steps:**
1. Find primary guest, open form.
2. Mark every guest as not attending.
3. Submit.

**Expected:**
- All guests have `attending = NO`.
- Confirmed page shows decline state.

---

## Access / Error Cases

### TC-11 — Non-primary guest searched → blocked with contact message

**Setup:** Household where guest B is `isPrimary = false` and guest A is primary.

**Steps:**
1. Navigate to `/rsvp`.
2. Search for guest B (the non-primary).
3. The result appears; click it.

**Expected:**
- No RSVP form is shown.
- A message appears: "Please ask [Primary Name] to complete the RSVP" (or the generic variant if primary name is absent).
- The form does **not** advance.

---

### TC-12 — Duplicate submission attempt → error + modify link hint

**Setup:** Use a household that has already submitted (TC-01 to TC-10 can serve as preconditions). Do **not** re-seed before this test.

**Steps:**
1. Navigate to `/rsvp` and search for the primary guest again.
2. The form loads (household may already be submitted — note: search still works).
3. Attempt to submit the form a second time.

**Expected:**
- An error message is displayed: "This household has already submitted an RSVP. Check your email for a link to modify it."
- `alreadySubmitted: true` is returned from the server action.
- User is **not** redirected to the confirmed page.
- No duplicate DB entries or emails are created.

---

## Modify Flow

### TC-13 — Change attendance via modify link; verify old token is invalidated

**Setup:** Complete TC-01 (solo guest, attending). Note the `rsvp_token` from DB before modifying.

**Steps:**
1. Open the modify link from the confirmation email: `/rsvp/modify/<token>`.
2. The modify page loads with pre-filled attendance.
3. Change attendance to **"Unable to attend"**.
4. Submit.
5. Copy the **old** token and navigate to `/rsvp/modify/<old-token>`.

**Expected:**
- Step 4: Redirected to `/rsvp/confirmed?attending=false`; modified confirmation email sent.
- Step 5: Old token is no longer valid → page shows "Invalid or expired link" error state (title from `ModifyRsvp.invalidTitle` translation).
- DB: `guests.attending = NO`, `rsvp_token` has a new value.

---

### TC-14 — Add plus one via modify link

**Setup:** TC-07 result (solo+Guest allowance, attended but added no plus ones). `maxPlusOnes ≥ 1`.

**Steps:**
1. Open modify link from confirmation email.
2. Add 1 plus one (first + last name).
3. Submit.

**Expected:**
- 1 new row in `plus_ones`.
- Modified confirmation email lists the plus one.
- Token rotated (new `rsvp_token` in DB).

---

### TC-15 — Remove plus one via modify link

**Setup:** TC-06 result (plus one was previously added).

**Steps:**
1. Open modify link.
2. Click remove/delete on the existing plus one.
3. Submit.

**Expected:**
- `plus_ones` row deleted.
- Modified confirmation email has no plus-one section.
- Token rotated.

---

### TC-16 — Invalid / fake token → error page

**Steps:**
1. Navigate to `/rsvp/modify/this-is-not-a-real-token`.

**Expected:**
- Page shows the "Invalid" error heading (from `ModifyRsvp.invalidTitle`).
- No form or household data is rendered.
- HTTP response should not leak DB details.

---

## Validation & Misc

### TC-17 — Required field validation

**Steps:**
1. Navigate to `/rsvp` and find any primary guest.
2. On the RSVP form, attempt to submit **without** selecting attendance for any guest.
3. Attempt to submit without an email address when one is required.
4. If plus ones are allowed, add a plus one but leave the first or last name blank; attempt to submit.

**Expected:**
- Browser-native or Zod validation prevents submission.
- Clear error messages appear next to the relevant fields.
- No server action is called until all required fields pass validation.

---

### TC-18 — Polish locale — UI and email in Polish

**Steps:**
1. Navigate to `/pl/rsvp` (or toggle language to Polish via navbar).
2. Verify all labels, buttons, and placeholder text appear in Polish.
3. Complete a full RSVP submission (attending).
4. Check the confirmation email.

**Expected:**
- UI strings are in Polish throughout the flow.
- Confirmation email content is in Polish.
- Confirmed page date is formatted with Polish locale (`pl-PL`).
- `households.preferred_locale = 'pl'` (or the locale stored matches).

---

### TC-19 — Confirmation page direct navigation

**Steps:**
1. Navigate directly to `/rsvp/confirmed?attending=true`.
2. Note what is rendered (venue cards, "View Details" button).
3. Navigate to `/rsvp/confirmed?attending=false`.
4. Note what is rendered.
5. Navigate to `/rsvp/confirmed` (no param).

**Expected:**
- `attending=true`: ceremony + reception cards visible; "View Details" → `/details`.
- `attending=false`: decline message; "Back to home" → `/`.
- No param: defaults to attending=true state (`params.attending !== "false"` → `true`).

---

## Quick-Check Checklist (run after every submission)

Use this after each TC to catch regressions:

- [ ] Correct redirect URL and `attending` query param
- [ ] Confirmation page renders the right state (attending vs. declining)
- [ ] Confirmation email delivered to the right address
- [ ] Email language matches selected locale
- [ ] `guests.attending` value correct in DB
- [ ] `guests.rsvp_submitted_at` is populated
- [ ] `guests.rsvp_token` is set (and unique)
- [ ] `guests.dietary_restrictions` stored if entered
- [ ] `plus_ones` rows created / updated / deleted as expected
- [ ] Old `rsvp_token` invalidated after modify
- [ ] No extra emails sent (no duplicate sends on retry)
