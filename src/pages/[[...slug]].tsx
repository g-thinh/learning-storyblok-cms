import { Box, Container } from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getStory } from "utils/apiHelpers";
import Hero from "components/Hero";
import isDev from "utils/isDev";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getStory("home", {
    version: isDev() ? "draft" : "published",
    language: context.locale,
    cv: Date.now(),
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
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story);

  return (
    <Container maxW="100%" p={0}>
      <Hero />
      <Box
        mx="auto"
        p={3}
        maxW={{ base: "100rem", md: "3xl", lg: "5xl", xl: "6xl" }}
      >
        {RenderRichText(story.content.body)}
      </Box>
    </Container>
  );
}
