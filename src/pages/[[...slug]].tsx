import { Container } from "@chakra-ui/react";
import CardQuote from "components/CardQuote";
import Features from "components/Features";
import { Hero } from "components/Hero";
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useStoryblok } from "services/storyblok";
import { getHomepage, getStoriesPaths } from "utils/apiHelpers";
import isDev from "utils/isDev";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getHomepage({
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
    <Container p={0} maxW={{ base: "100%" }}>
      <Hero
        title={story.content.hero_title}
        description={story.content.hero_description}
        image={story.content.hero_image}
      />
      <Features
        features={story.content.features}
        name={story.content.features_headline}
        description={story.content.features_description}
      />
      <CardQuote authorId={story.content.author} text={story.content.quote} />
    </Container>
  );
}
