import { Box, Container, Heading } from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getStory } from "utils/apiHelpers";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getStory("home", {
    // version: context.preview ? "draft" : "published",
    version: "draft",
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
      <Box
        mx="auto"
        p={3}
        maxW={{ base: "100rem", md: "52rem", lg: "58rem", xl: "72rem" }}
      >
        {RenderRichText(story.content.body)}
      </Box>
    </Container>
  );
}
