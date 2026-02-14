import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface GuestDetail {
  name: string;
  attending: boolean;
  mealPreference: string | null;
}

interface PlusOneDetail {
  name: string;
  mealPreference: string | null;
}

interface RsvpModifiedEmailProps {
  householdName: string;
  guests: GuestDetail[];
  plusOnes: PlusOneDetail[];
  modifyUrl: string;
}

export default function RsvpModifiedEmail({
  householdName = "The Smith Family",
  guests = [],
  plusOnes = [],
  modifyUrl = "https://example.com/rsvp/modify/token",
}: RsvpModifiedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your RSVP has been updated</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>RSVP Updated</Heading>
          <Text style={text}>
            Your RSVP for <strong>{householdName}</strong> has been updated.
            Here is your revised summary.
          </Text>

          <Section style={summarySection}>
            <Heading as="h3" style={subheading}>
              Guests
            </Heading>
            {guests.map((guest, i) => (
              <Text key={i} style={guestLine}>
                {guest.name} — {guest.attending ? "Attending" : "Not Attending"}
                {guest.attending && guest.mealPreference
                  ? ` (${guest.mealPreference})`
                  : ""}
              </Text>
            ))}

            {plusOnes.length > 0 && (
              <>
                <Heading as="h3" style={subheading}>
                  Plus Ones
                </Heading>
                {plusOnes.map((po, i) => (
                  <Text key={i} style={guestLine}>
                    {po.name}
                    {po.mealPreference ? ` (${po.mealPreference})` : ""}
                  </Text>
                ))}
              </>
            )}
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            Need to make more changes? You can{" "}
            <Link href={modifyUrl} style={link}>
              modify your RSVP here
            </Link>
            .
          </Text>

          <Text style={footer}>
            We are excited to celebrate with you!
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f6f6", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "32px 24px", maxWidth: "520px" };
const heading = { fontSize: "24px", fontWeight: "600" as const, marginBottom: "16px" };
const subheading = { fontSize: "16px", fontWeight: "600" as const, marginBottom: "8px", marginTop: "16px" };
const text = { fontSize: "14px", lineHeight: "1.6", color: "#333" };
const guestLine = { fontSize: "14px", lineHeight: "1.4", color: "#333", margin: "4px 0" };
const summarySection = { backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px", marginTop: "16px" };
const hr = { borderColor: "#ddd", margin: "24px 0" };
const link = { color: "#8B7355", textDecoration: "underline" };
const footer = { fontSize: "14px", color: "#666", marginTop: "16px" };
