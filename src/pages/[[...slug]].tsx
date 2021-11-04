import { Box, Container, Heading, useColorMode } from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getPaths, getStory } from "utils/apiHelpers";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getStory("home", {
    version: context.preview ? "draft" : "published",
    language: context.locale,
  });

  return {
    props: {
      story: story,
      preview: context.preview || false,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const paths = await getPaths();
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story, props.preview, props.locale);
  const { colorMode } = useColorMode();
  return (
    <Container maxW="100%">
      <Container m="auto" maxW="72rem">
        <Heading as="h1" mb={6} textAlign="center">
          {story.content.title}
        </Heading>
        <Heading as="h2" mb={6} textAlign="center">
          {props.locale}
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
