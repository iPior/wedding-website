import { normalizeLocale, type AppLocale } from "@/lib/locale";

type RsvpEmailCopy = {
  preview: (attendingCount?: number) => string;
  label: string;
  heading: string;
  intro: (householdName: string) => string;
  guestsLabel: string;
  plusOnesLabel: string;
  attending: string;
  notAttending: string;
  dietaryLabel: string;
  ctaHint: string;
  cta: string;
  closing: string;
  subject: string;
};

type BroadcastEmailCopy = {
  label: string;
  closing: (coupleName: string) => string;
  unsubscribe: string;
};

export type EmailMessages = {
  rsvpConfirmation: RsvpEmailCopy;
  rsvpModified: RsvpEmailCopy;
  broadcast: BroadcastEmailCopy;
};

const en: EmailMessages = {
  rsvpConfirmation: {
    preview: (attendingCount = 0) => `Your RSVP was received - ${attendingCount} attending`,
    label: "RSVP CONFIRMATION",
    heading: "Thank You",
    intro: () =>
      `Your response has been received. Here is a summary of your RSVP.`,
    guestsLabel: "GUESTS",
    plusOnesLabel: "PLUS ONES",
    attending: "Attending",
    notAttending: "Not Attending",
    dietaryLabel: "Dietary restrictions",
    ctaHint: "Need to make changes?",
    cta: "Modify Your RSVP",
    closing: "We are excited to celebrate with you!",
    subject: "RSVP Confirmation",
  },
  rsvpModified: {
    preview: () => "Your RSVP has been updated",
    label: "RSVP UPDATED",
    heading: "Changes Received",
    intro: (householdName) =>
      `Your RSVP for ${householdName} has been updated. Here is your revised summary.`,
    guestsLabel: "GUESTS",
    plusOnesLabel: "PLUS ONES",
    attending: "Attending",
    notAttending: "Not Attending",
    dietaryLabel: "Dietary restrictions",
    ctaHint: "Need to make more changes?",
    cta: "Modify Your RSVP",
    closing: "We are excited to celebrate with you!",
    subject: "RSVP Updated",
  },
  broadcast: {
    label: "WEDDING UPDATE",
    closing: (coupleName) => `With love, ${coupleName}`,
    unsubscribe: "You are receiving this email because you RSVPed to our wedding.",
  },
};

const pl: EmailMessages = {
  rsvpConfirmation: {
    preview: (attendingCount = 0) => `Otrzymalismy RSVP - ${attendingCount} potwierdzonych`,
    label: "POTWIERDZENIE RSVP",
    heading: "Dziekujemy",
    intro: () =>
      `Otrzymalismy Wasza odpowiedz. Oto podsumowanie Waszej odpowiedzi.`,
    guestsLabel: "GOSCIE",
    plusOnesLabel: "OSOBY TOWARZYSZACE",
    attending: "Obecny",
    notAttending: "Nieobecny",
    dietaryLabel: "Ograniczenia dietetyczne",
    ctaHint: "Chcecie wprowadzic zmiany?",
    cta: "Zmien RSVP",
    closing: "Nie mozemy sie doczekac wspolnego swietowania!",
    subject: "Potwierdzenie RSVP",
  },
  rsvpModified: {
    preview: () => "Zaktualizowalismy Wasze RSVP",
    label: "AKTUALIZACJA RSVP",
    heading: "Zmiany zapisane",
    intro: (householdName) =>
      `Wasze RSVP dla ${householdName} zostalo zaktualizowane. Oto aktualne podsumowanie.`,
    guestsLabel: "GOSCIE",
    plusOnesLabel: "OSOBY TOWARZYSZACE",
    attending: "Obecny",
    notAttending: "Nieobecny",
    dietaryLabel: "Ograniczenia dietetyczne",
    ctaHint: "Potrzebujecie kolejnych zmian?",
    cta: "Zmien RSVP",
    closing: "Nie mozemy sie doczekac wspolnego swietowania!",
    subject: "RSVP zaktualizowane",
  },
  broadcast: {
    label: "AKTUALNOSCI SLUBNE",
    closing: (coupleName) => `Serdecznie, ${coupleName}`,
    unsubscribe: "Otrzymujesz ten email, poniewaz potwierdziles udzial w naszym slubie.",
  },
};

const emailMessagesByLocale: Record<AppLocale, EmailMessages> = {
  en,
  pl,
};

export function getEmailMessages(locale: string | null | undefined): EmailMessages {
  return emailMessagesByLocale[normalizeLocale(locale)];
}
