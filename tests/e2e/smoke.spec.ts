import { expect, test } from "@playwright/test";

test("home page loads", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "site_access",
      value: "granted",
      url: "http://localhost:4173",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
  await page.goto("/");
  await expect(page.getByRole("link", { name: "RSVP", exact: true })).toBeVisible();
});
