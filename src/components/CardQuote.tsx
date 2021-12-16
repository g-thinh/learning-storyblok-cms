import { Box, Container, Stack, useColorModeValue } from "@chakra-ui/react";
import { Richtext } from "storyblok-js-client";
import Author from "./Author";
import RenderRichText from "./RenderRichText";

type CardQuoteProps = {
  authorId?: string;
  text?: Richtext;
};

export default function CardQuote({ authorId, text }: CardQuoteProps) {
  return (
    <Container
      as="article"
      my={10}
      maxW={{ base: "95%", md: "4xl" }}
      border="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.900")}
      borderRadius="xl"
      boxShadow="2xl"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Stack spacing={3} align={"center"} direction={"column"} py={12} px={8}>
        {RenderRichText(text)}
        <Box textAlign={"center"}>
          <Author
            avatarSize="lg"
            authorId={authorId}
            showRole
            direction="column"
          />
        </Box>
      </Stack>
    </Container>
  );
}
