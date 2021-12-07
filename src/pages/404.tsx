import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400, red.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="xl" mt={3} mb={2}>
          {t("error404")}
        </Text>
        <Text color={"gray.500"} mb={6}>
          {t("error404message")}
        </Text>

        <Button colorScheme="red">{t("error404cta")}</Button>
      </Box>
    </Container>
  );
}
