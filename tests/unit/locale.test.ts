import { describe, expect, it } from "vitest";
import { getEmailMessages } from "@/emails/i18n";
import { normalizeLocale, withLocalePath } from "@/lib/locale";

describe("normalizeLocale", () => {
  it("normalizes base locales", () => {
    expect(normalizeLocale("en")).toBe("en");
    expect(normalizeLocale("pl")).toBe("pl");
  });

  it("normalizes region variants", () => {
    expect(normalizeLocale("en-US")).toBe("en");
    expect(normalizeLocale("pl-PL")).toBe("pl");
  });

  it("falls back to default locale", () => {
    expect(normalizeLocale("de-DE")).toBe("en");
    expect(normalizeLocale(undefined)).toBe("en");
  });
});

describe("withLocalePath", () => {
  it("omits locale prefix for default locale", () => {
    expect(withLocalePath("en", "/rsvp/modify/token")).toBe("/rsvp/modify/token");
  });

  it("adds locale prefix for non-default locale", () => {
    expect(withLocalePath("pl", "/rsvp/modify/token")).toBe("/pl/rsvp/modify/token");
  });
});

describe("email i18n messages", () => {
  it("returns english copy by default", () => {
    const messages = getEmailMessages(undefined);
    expect(messages.rsvpConfirmation.subject).toBe("RSVP Confirmation");
  });

  it("returns polish copy when locale is pl", () => {
    const messages = getEmailMessages("pl");
    expect(messages.rsvpConfirmation.subject).toBe("Potwierdzenie RSVP");
  });
});
