import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface BroadcastEmailProps {
  subject: string;
  body: string;
  coupleName: string;
}

export default function BroadcastEmail({
  subject = "Wedding Update",
  body = "We have an exciting update to share with you!",
  coupleName = "Jordan & Alex",
}: BroadcastEmailProps) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{subject}</Heading>

          {paragraphs.map((paragraph, i) => (
            <Text key={i} style={text}>
              {paragraph}
            </Text>
          ))}

          <Hr style={hr} />

          <Text style={footer}>
            With love, {coupleName}
          </Text>

          <Text style={unsubscribe}>
            You are receiving this email because you RSVPed to our wedding.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: "#f6f6f6", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "32px 24px", maxWidth: "520px" };
const heading = { fontSize: "24px", fontWeight: "600" as const, marginBottom: "16px" };
const text = { fontSize: "14px", lineHeight: "1.6", color: "#333" };
const hr = { borderColor: "#ddd", margin: "24px 0" };
const footer = { fontSize: "14px", color: "#666", fontStyle: "italic" as const };
const unsubscribe = { fontSize: "11px", color: "#999", marginTop: "24px" };
