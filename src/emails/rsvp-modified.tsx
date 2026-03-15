import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { weddingConfig } from "../../wedding.config";
import { getEmailMessages } from "@/emails/i18n";
import { type AppLocale } from "@/lib/locale";

const { person1, person2 } = weddingConfig.couple;

interface GuestDetail {
  name: string;
  attending: boolean;
  dietaryRestrictions?: string | null;
}

interface PlusOneDetail {
  name: string;
  dietaryRestrictions?: string | null;
}

interface RsvpModifiedEmailProps {
  householdName: string;
  guests: GuestDetail[];
  plusOnes: PlusOneDetail[];
  modifyUrl: string;
  locale?: AppLocale;
}

export default function RsvpModifiedEmail({
  householdName = "The Smith Family",
  guests = [],
  plusOnes = [],
  modifyUrl = "https://example.com/rsvp/modify/token",
  locale = "en",
}: RsvpModifiedEmailProps) {
  const m = getEmailMessages(locale).rsvpModified;

  return (
    <Html>
      <Head>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');`}</style>
      </Head>
      <Preview>{m.preview()}</Preview>
      <Body style={body}>
        <Container style={wrapper}>
          {/* Monogram Header */}
          <Section style={header}>
            <Text style={monogram}>
              {person1.firstName.charAt(0)}&nbsp;&nbsp;&&nbsp;&nbsp;
              {person2.firstName.charAt(0)}
            </Text>
            <Hr style={roseLine} />
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={label}>{m.label}</Text>
            <Heading style={mainHeading}>{m.heading}</Heading>
            <Text style={bodyText}>{m.intro(householdName)}</Text>

            {/* Guest Summary Card */}
            <Section style={card}>
              <Text style={cardLabel}>{m.guestsLabel}</Text>
              <Hr style={cardDivider} />
              {guests.map((guest, i) => (
                <div key={i}>
                  <Text style={guestRow}>
                    {guest.name}
                    <span
                      style={guest.attending ? statusAttending : statusDeclined}
                    >
                      {guest.attending
                        ? ` - ${m.attending}`
                        : ` - ${m.notAttending}`}
                    </span>
                  </Text>
                  {guest.attending && guest.dietaryRestrictions && (
                    <Text style={dietaryText}>
                      {m.dietaryLabel}: {guest.dietaryRestrictions}
                    </Text>
                  )}
                </div>
              ))}

              {plusOnes.length > 0 && (
                <>
                  <Text style={{ ...cardLabel, marginTop: "20px" }}>
                    {m.plusOnesLabel}
                  </Text>
                  <Hr style={cardDivider} />
                  {plusOnes.map((po, i) => (
                    <div key={i}>
                      <Text style={guestRow}>
                        {po.name}
                      </Text>
                      {po.dietaryRestrictions && (
                        <Text style={dietaryText}>
                          {m.dietaryLabel}: {po.dietaryRestrictions}
                        </Text>
                      )}
                    </div>
                  ))}
                </>
              )}
            </Section>

            <Hr style={divider} />

            <Text style={{ ...bodyText, textAlign: "center" as const }}>
              {m.ctaHint}
            </Text>

            <Section
              style={{ textAlign: "center" as const, margin: "16px 0 0" }}
            >
              <Button href={modifyUrl} style={button}>
                {m.cta}
              </Button>
            </Section>

            <Text style={closing}>
              {m.closing}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerMonogram}>
              {person1.firstName.charAt(0)}&nbsp;&&nbsp;
              {person2.firstName.charAt(0)}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ── Fonts ────────────────────────────────────────────────
const fontDisplay = "'Playfair Display', Georgia, 'Times New Roman', serif";
const fontBody =
  "'Lato', -apple-system, 'Helvetica Neue', Arial, sans-serif";

// ── Styles ───────────────────────────────────────────────
const body = {
  backgroundColor: "#FFFFF0",
  fontFamily: fontBody,
  margin: "0",
  padding: "40px 0",
};
const wrapper = {
  margin: "0 auto",
  maxWidth: "520px",
  backgroundColor: "#ffffff",
  borderTop: "3px solid #B08A50",
};
const header = {
  padding: "36px 32px 0",
  textAlign: "center" as const,
};
const monogram = {
  fontFamily: fontDisplay,
  fontSize: "26px",
  color: "#2c2424",
  letterSpacing: "0.12em",
  margin: "0 0 16px",
  textAlign: "center" as const,
};
const roseLine = {
  borderTop: "2px solid #B08A50",
  borderBottom: "none" as const,
  borderLeft: "none" as const,
  borderRight: "none" as const,
  width: "48px",
  margin: "0 auto",
};
const content = { padding: "28px 32px 36px" };
const label = {
  fontFamily: fontBody,
  fontSize: "11px",
  fontWeight: 400 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.35em",
  color: "#8A7F70",
  margin: "0 0 6px",
  textAlign: "center" as const,
};
const mainHeading = {
  fontFamily: fontDisplay,
  fontSize: "28px",
  fontWeight: 400 as const,
  color: "#2c2424",
  margin: "0 0 20px",
  textAlign: "center" as const,
};
const bodyText = {
  fontFamily: fontBody,
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#5A4F44",
  margin: "0 0 8px",
};
const card = {
  padding: "20px 0",
  margin: "24px 0",
};
const cardLabel = {
  fontFamily: fontBody,
  fontSize: "10px",
  fontWeight: 700 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.3em",
  color: "#8A7F70",
  margin: "0",
};
const cardDivider = {
  borderTop: "1px solid #E8DCC8",
  borderBottom: "none" as const,
  borderLeft: "none" as const,
  borderRight: "none" as const,
  margin: "8px 0 12px",
};
const dietaryText = {
  fontFamily: fontBody,
  fontSize: "12px",
  lineHeight: "1.4",
  color: "#8A7F70",
  fontStyle: "italic" as const,
  margin: "0 0 6px",
};
const guestRow = {
  fontFamily: fontBody,
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#2c2424",
  margin: "6px 0 0",
};
const statusAttending = { color: "#B08A50" };
const statusDeclined = { color: "#8A7F70" };
const divider = {
  borderTop: "1px solid #E8DCC8",
  borderBottom: "none" as const,
  borderLeft: "none" as const,
  borderRight: "none" as const,
  margin: "24px 0",
};
const button = {
  backgroundColor: "#2c2424",
  color: "#FFFDF5",
  fontFamily: fontBody,
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.3em",
  padding: "14px 32px",
  textDecoration: "none",
};
const closing = {
  fontFamily: fontDisplay,
  fontSize: "15px",
  fontStyle: "italic" as const,
  color: "#8A7F70",
  margin: "28px 0 0",
  textAlign: "center" as const,
};
const footer = {
  backgroundColor: "#2c2424",
  padding: "20px 32px",
  textAlign: "center" as const,
};
const footerMonogram = {
  fontFamily: fontDisplay,
  fontSize: "14px",
  color: "#8A7F70",
  letterSpacing: "0.12em",
  margin: "0",
  textAlign: "center" as const,
};
