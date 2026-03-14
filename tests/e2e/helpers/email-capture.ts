import { readFile, rm } from "node:fs/promises";

export type CapturedEmail = {
  to: string | string[];
  from: string;
  subject: string;
  sentAt: string;
  hasReact: boolean;
  modifyUrl: string | null;
  locale: string | null;
  html: string | null;
  text: string | null;
};

export const EMAIL_CAPTURE_FILE =
  process.env.TEST_EMAIL_CAPTURE_FILE ?? "/tmp/wedding-rsvp-e2e-emails.jsonl";

export async function clearCapturedEmails() {
  await rm(EMAIL_CAPTURE_FILE, { force: true });
}

export async function readCapturedEmails(): Promise<CapturedEmail[]> {
  try {
    const contents = await readFile(EMAIL_CAPTURE_FILE, "utf8");
    return contents
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as CapturedEmail);
  } catch {
    return [];
  }
}
