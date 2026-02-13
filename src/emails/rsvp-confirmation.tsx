import { Body, Container, Head, Html, Preview, Text } from "@react-email/components";

export default function RsvpConfirmationEmail() {
  return (
    <Html>
      <Head />
      <Preview>Your RSVP was received</Preview>
      <Body>
        <Container>
          <Text>Thanks for your RSVP. We are excited to celebrate with you.</Text>
        </Container>
      </Body>
    </Html>
  );
}
