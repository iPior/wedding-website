import { Body, Container, Head, Html, Preview, Text } from "@react-email/components";

export default function RsvpModifiedEmail() {
  return (
    <Html>
      <Head />
      <Preview>Your RSVP was updated</Preview>
      <Body>
        <Container>
          <Text>Your RSVP changes were saved successfully.</Text>
        </Container>
      </Body>
    </Html>
  );
}
