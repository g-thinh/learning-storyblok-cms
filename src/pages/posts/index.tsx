import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import Link from "components/Link";
import RenderRichText from "components/RenderRichText";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getStories, getStory } from "utils/apiHelpers";

export async function getStaticProps(context: GetStaticPropsContext) {
  const allStories = await getStories({
    starts_with: "posts",
    is_startpage: 0,
    version: context.preview ? "draft" : "published",
    language: context.locale,
    cv: Date.now(),
  });

  const story = await getStory("posts", {
    version: context.preview ? "draft" : "published",
    language: context.locale,
  });

  return {
    props: {
      story: story,
      stories: allStories,
      preview: context.preview || false,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export default function PostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story);

  return (
    <Container maxW="100%">
      <Container m="auto" maxW="72rem">
        <Heading as="h1" mb={6} textAlign="center">
          {story.content.title}
        </Heading>
        <Container p={4}>
          <Box>{RenderRichText(story.content.body)}</Box>
          <VStack>
            {props.stories.map((story) => {
              return (
                <Link key={story.id} href={`/${story.full_slug}`}>
                  {story.name}
                </Link>
              );
            })}
          </VStack>
        </Container>
      </Container>
    </Container>
  );
}
