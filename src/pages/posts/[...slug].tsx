import { Box, Container, Heading } from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getPaths, getStory } from "utils/apiHelpers";

export async function getStaticProps(context: GetStaticPropsContext) {
  const {
    params: { slug },
  } = context;

  const story = await getStory(`posts/${slug[0]}`, {
    version: context.preview ? "draft" : "published",
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
  const paths = await getPaths({
    starts_with: "posts",
  });
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default function PostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story, props.preview, props.locale);
  return (
    <Container maxW="100%">
      <Container m="auto" maxW="72rem">
        <Heading as="h1" mb={6} textAlign="center">
          {story.content.title}
        </Heading>
        <Container p={4}>
          <Box>{RenderRichText(story.content.body)}</Box>
        </Container>
      </Container>
    </Container>
  );
}
