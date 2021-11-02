import { Container, Heading, useColorMode } from "@chakra-ui/react";
import DynamicComponent from "components/DynamicComponent";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Storyblok, { useStoryblok } from "services/storyblok";

export async function getStaticProps(context: GetStaticPropsContext) {
  // the slug of the story
  const slug = "home";

  // the storyblok params
  const params = {
    version: "draft", // or 'published'
  };

  // checks if Next.js is in preview mode
  if (context.preview) {
    // loads the draft version
    params.version = "draft";
    // appends the cache version to get the latest content
  }

  // loads the story from the Storyblok API
  const { data } = await Storyblok.get(`cdn/stories/${slug}`, params);

  // return the story from Storyblok and whether preview mode is active
  return {
    props: {
      story: data ? data.story : false,
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
          {story ? story.name : "My Site"}
        </Heading>
        <Container
          bg={colorMode === "dark" ? "gray.700" : "gray.200"}
          p={4}
          borderRadius={12}
          boxShadow="md"
        >
          <DynamicComponent blok={story.content} />
        </Container>
      </Container>
    </Container>
  );
}
