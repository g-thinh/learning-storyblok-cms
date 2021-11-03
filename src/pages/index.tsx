import { Box, Container, Heading, useColorMode } from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getStory } from "utils/apiHelpers";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getStory("home", {
    version: context.preview ? "draft" : "published",
  });

  return {
    props: {
      story: story,
      preview: context.preview || false,
    },
    revalidate: 10,
  };
}

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story, props.preview);

  const { colorMode } = useColorMode();
  return (
    <Container maxW="100%">
      <Container m="auto" maxW="72rem">
        <Heading as="h1" mb={6} textAlign="center">
          {story.content.title}
        </Heading>
        <Container
          bg={colorMode === "dark" ? "gray.700" : "gray.200"}
          p={4}
          borderRadius={12}
          boxShadow="md"
        >
          <Box>{RenderRichText(story.content.body)}</Box>
        </Container>
      </Container>
    </Container>
  );
}
