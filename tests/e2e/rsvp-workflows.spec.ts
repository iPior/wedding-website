import { expect, test, type Page } from "@playwright/test";
import {
  TOKENS,
  disconnectDb,
  getGuest,
  getPlusOnesByHouseholdName,
  resetAndSeedRsvpFixtures,
} from "./helpers/db";
import { clearCapturedEmails, readCapturedEmails } from "./helpers/email-capture";

async function openGuest(page: Page, firstName: string, lastName: string) {
  await page.goto("/rsvp");
  await page.getByLabel("First Name").fill(firstName);
  await page.getByLabel("Last Name").fill(lastName);
  await page.getByRole("button", { name: "Find My Invitation" }).click();
  await page.getByRole("button", { name: new RegExp(`^${firstName} ${lastName}`) }).first().click();
}

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: "site_access",
      value: "granted",
      url: "http://localhost:4173",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);

  await resetAndSeedRsvpFixtures();
  await clearCapturedEmails();
});

test.afterAll(async () => {
  await disconnectDb();
});

test("TC-01: solo attending with dietary restriction is persisted and emailed", async ({ page }) => {
  await openGuest(page, "Alice", "Solo");

  await page.getByRole("button", { name: "Joyfully Accepts" }).first().click();
  await page.getByLabel("Your Email").fill("alice@example.com");
  await page.getByPlaceholder("Any allergies or dietary restrictions...").fill("gluten-free");
  await page.getByRole("button", { name: "Submit RSVP" }).click();

  await expect(page).toHaveURL(/\/rsvp\/confirmed\?attending=true/);
  await expect(page.getByText("Ceremony")).toBeVisible();

  const guest = await getGuest("Alice", "Solo");
  expect(guest?.attending).toBe("YES");
  expect(guest?.dietaryRestrictions).toBe("gluten-free");
  expect(guest?.rsvpSubmittedAt).toBeTruthy();

  const emails = await readCapturedEmails();
  expect(emails).toHaveLength(1);
  expect(emails[0].to).toBe("alice@example.com");
  expect(emails[0].subject).toBe("RSVP Confirmation");
});

test("TC-02: solo decline renders decline confirmation and persists NO", async ({ page }) => {
  await openGuest(page, "Alice", "Solo");

  await page.getByRole("button", { name: "Regretfully Declines" }).first().click();
  await page.getByLabel("Your Email").fill("alice-decline@example.com");
  await page.getByRole("button", { name: "Submit RSVP" }).click();

  await expect(page).toHaveURL(/\/rsvp\/confirmed\?attending=false/);
  await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();

  const guest = await getGuest("Alice", "Solo");
  expect(guest?.attending).toBe("NO");
});

test("TC-04: couple split attendance is persisted", async ({ page }) => {
  await openGuest(page, "Bob", "Pair");

  await page.getByRole("button", { name: "Joyfully Accepts" }).nth(0).click();
  await page.getByRole("button", { name: "Regretfully Declines" }).nth(1).click();
  await page.getByLabel("Your Email").fill("bob@example.com");
  await page.getByRole("button", { name: "Submit RSVP" }).click();

  await expect(page).toHaveURL(/\/rsvp\/confirmed\?attending=true/);

  const primary = await getGuest("Bob", "Pair");
  const partner = await getGuest("Cara", "Pair");
  expect(primary?.attending).toBe("YES");
  expect(partner?.attending).toBe("NO");
});

test("TC-05: form title reflects selected primary guest", async ({ page }) => {
  await page.goto("/rsvp");
  await page.getByLabel("First Name").fill("Alex");
  await page.getByLabel("Last Name").fill("Johne");
  await page.getByRole("button", { name: "Find My Invitation" }).click();
  await page.getByRole("button", { name: /^Alex Johne/ }).first().click();
  await expect(page.locator("form h2").first()).toHaveText("Alex Johne");

  await page.getByRole("button", { name: "Back to search" }).click();

  await page.getByLabel("First Name").fill("Rachel");
  await page.getByLabel("Last Name").fill("Johne");
  await page.getByRole("button", { name: "Find My Invitation" }).click();
  await page.getByRole("button", { name: /^Rachel Johne/ }).first().click();
  await expect(page.locator("form h2").first()).toHaveText("Rachel Johne");
});

test("TC-06: plus-one add obeys limit and persists plus one", async ({ page }) => {
  await openGuest(page, "Dan", "Guest");

  await page.getByRole("button", { name: "Joyfully Accepts" }).first().click();
  await page.getByRole("button", { name: "+ Add Guest" }).click();
  await expect(page.getByRole("button", { name: "+ Add Guest" })).toHaveCount(0);

  const plusOneInputs = page.locator("input[required]:not(#email)");
  await plusOneInputs.nth(0).fill("Plus");
  await plusOneInputs.nth(1).fill("Friend");
  await page.getByLabel("Your Email").fill("dan@example.com");
  await page.getByRole("button", { name: "Submit RSVP" }).click();
  await expect(page).toHaveURL(/\/rsvp\/confirmed\?attending=true/);

  const plusOnes = await getPlusOnesByHouseholdName("E2E Solo Plus");
  expect(plusOnes).toHaveLength(1);
  expect(plusOnes[0].firstName).toBe("Plus");
  expect(plusOnes[0].lastName).toBe("Friend");
});

test("TC-07: plus-one optional flow saves without plus one rows", async ({ page }) => {
  await openGuest(page, "Dan", "Guest");

  await page.getByRole("button", { name: "Joyfully Accepts" }).first().click();
  await page.getByLabel("Your Email").fill("dan-no-plus@example.com");
  await page.getByRole("button", { name: "Submit RSVP" }).click();

  const plusOnes = await getPlusOnesByHouseholdName("E2E Solo Plus");
  expect(plusOnes).toHaveLength(0);
});

test("TC-11: non-primary guest is blocked with household message", async ({ page }) => {
  await page.goto("/rsvp");
  await page.getByLabel("First Name").fill("Cara");
  await page.getByLabel("Last Name").fill("Pair");
  await page.getByRole("button", { name: "Find My Invitation" }).click();
  await page.getByRole("button", { name: /^Cara Pair/ }).click();

  await expect(page.getByText("is managing the RSVP for your household")).toBeVisible();
  await expect(page.getByLabel("Your Email")).toHaveCount(0);
});

test("TC-12: duplicate submission attempt is blocked", async ({ page }) => {
  await openGuest(page, "Finn", "Done");

  await page.getByRole("button", { name: "Submit RSVP" }).click();

  await expect(page).toHaveURL(/\/rsvp$/);
  await expect(page.getByText("already submitted an RSVP")).toBeVisible();

  const emails = await readCapturedEmails();
  expect(emails).toHaveLength(0);
});

test("TC-13: modify flow rotates token and invalidates old link", async ({ page }) => {
  await page.goto(`/rsvp/modify/${TOKENS.modifyAdd}`);
  await expect(page.getByRole("heading", { name: "Modify RSVP" })).toBeVisible();

  await page.getByRole("button", { name: "Regretfully Declines" }).first().click();
  await page.getByRole("button", { name: "Update RSVP" }).click();

  await expect(page.getByRole("heading", { name: "RSVP Updated" })).toBeVisible();

  const guest = await getGuest("Mila", "Edit");
  expect(guest?.attending).toBe("NO");
  expect(guest?.rsvpToken).not.toBe(TOKENS.modifyAdd);

  const emails = await readCapturedEmails();
  expect(emails).toHaveLength(1);
  expect(emails[0].subject).toBe("RSVP Updated");

  await page.goto(`/rsvp/modify/${TOKENS.modifyAdd}`);
  await expect(page.getByRole("heading", { name: "Invalid Link" })).toBeVisible();
});

test("TC-14: modify flow can add plus one", async ({ page }) => {
  await page.goto(`/rsvp/modify/${TOKENS.modifyAdd}`);

  await page.getByRole("button", { name: "Joyfully Accepts" }).first().click();
  await page.getByRole("button", { name: "+ Add Guest" }).click();
  const plusOneInputs = page.locator("input[required]:not(#email)");
  await plusOneInputs.nth(0).fill("New");
  await plusOneInputs.nth(1).fill("Guest");
  await page.getByRole("button", { name: "Update RSVP" }).click();
  await expect(page.getByRole("heading", { name: "RSVP Updated" })).toBeVisible();

  const plusOnes = await getPlusOnesByHouseholdName("E2E Modify Add");
  expect(plusOnes).toHaveLength(1);
  expect(plusOnes[0].firstName).toBe("New");
});

test("TC-15: modify flow can remove plus one", async ({ page }) => {
  await page.goto(`/rsvp/modify/${TOKENS.modifyRemove}`);
  await page.getByRole("button", { name: "Remove" }).click();
  await page.getByRole("button", { name: "Update RSVP" }).click();
  await expect(page.getByRole("heading", { name: "RSVP Updated" })).toBeVisible();

  const plusOnes = await getPlusOnesByHouseholdName("E2E Modify Remove");
  expect(plusOnes).toHaveLength(0);
});

test("TC-16: invalid token renders invalid page", async ({ page }) => {
  await page.goto("/rsvp/modify/not-a-real-token");
  await expect(page.getByRole("heading", { name: "Invalid Link" })).toBeVisible();
});

test.describe("Polish locale flow", () => {
  test.use({ locale: "pl-PL" });

  test("TC-18: Polish RSVP persists locale and sends Polish email", async ({ page }) => {
  await page.goto("/pl/rsvp");
  await page.getByLabel("Imię").fill("Pawel");
  await page.getByLabel("Nazwisko").fill("Polski");
  await page.getByRole("button", { name: "Znajdź moje zaproszenie" }).click();
  await page.getByRole("button", { name: /^Pawel Polski/ }).click();

  await page.getByRole("button", { name: "Z radością potwierdzam" }).first().click();
  await page.getByLabel("Twój e-mail adres").fill("pawel@example.com");
  await page.getByRole("button", { name: "Prześlij RSVP" }).click();

  await expect(page).toHaveURL(/\/pl\/rsvp\/confirmed\?attending=true/);
  await expect(page.getByRole("heading", { name: "Dziękujemy" })).toBeVisible();

  const guest = await getGuest("Pawel", "Polski");
  expect(guest?.household.preferredLocale).toBe("pl");

  const emails = await readCapturedEmails();
  expect(emails).toHaveLength(1);
  expect(emails[0].subject).toBe("Potwierdzenie RSVP");
  });
});

test("TC-19: confirmation direct navigation supports attending variants", async ({ page }) => {
  await page.goto("/rsvp/confirmed?attending=true");
  await expect(page.getByRole("link", { name: "View Full Details" })).toBeVisible();

  await page.goto("/rsvp/confirmed?attending=false");
  await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();

  await page.goto("/rsvp/confirmed");
  await expect(page.getByRole("link", { name: "View Full Details" })).toBeVisible();
});
