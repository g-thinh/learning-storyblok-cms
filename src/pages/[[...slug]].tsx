import { Box, Container, Divider } from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import {
  GetStaticPropsContext,
  GetStaticPathsContext,
  InferGetStaticPropsType,
} from "next";
import { useStoryblok } from "services/storyblok";
import { getStory, getStoriesPaths } from "utils/apiHelpers";
import Hero from "components/Hero";
import isDev from "utils/isDev";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getStory(`home`, {
    version: isDev() ? "draft" : "published",
    language: context.locale,
    cv: Date.now(),
  });

  //because of [[...slug]] its hard to catch 404s i.e. /fr/this-is-not-real
  if (context.params.slug) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      story: story,
      preview: context.preview || false,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getStoriesPaths({ starts_with: "home" }, locales);
  return {
    paths,
    fallback: "blocking",
  };
}

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story);

  return (
    <Container maxW={{ base: "100%", sm: "5xl", lg: "6xl" }}>
      <Hero />
      <Divider
        bgGradient="linear(to-r, teal.200,teal.300, teal.600)"
        borderRadius="sm"
        height={1}
        width="100%"
        my={8}
      />
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
