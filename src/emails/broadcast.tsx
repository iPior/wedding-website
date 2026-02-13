import { Body, Container, Head, Html, Preview, Text } from "@react-email/components";

export default function BroadcastEmail() {
  return (
    <Html>
      <Head />
      <Preview>Wedding update</Preview>
      <Body>
        <Container>
          <Text>This is a broadcast update for all subscribed guests.</Text>
        </Container>
      </Body>
    </Html>
  );
}
