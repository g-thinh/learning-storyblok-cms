import { Box, Container, Heading } from "@chakra-ui/react";
import FormContact from "components/FormContact";

export default function ContactPage() {
  return (
    <Container maxW={{ base: "100%", sm: "5xl", lg: "6xl" }}>
      <FormContact />
    </Container>
  );
}
