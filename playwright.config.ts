import { defineConfig, devices } from "@playwright/test";

const EMAIL_CAPTURE_FILE = process.env.TEST_EMAIL_CAPTURE_FILE ?? "/tmp/wedding-rsvp-e2e-emails.jsonl";
process.env.TEST_EMAIL_CAPTURE_FILE = EMAIL_CAPTURE_FILE;

export default defineConfig({
  workers: 1,
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "bun run dev --port 4173",
    url: "http://localhost:4173",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ...process.env,
      TEST_EMAIL_CAPTURE_FILE: EMAIL_CAPTURE_FILE,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
