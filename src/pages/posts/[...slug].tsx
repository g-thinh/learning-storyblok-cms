import {
  Box,
  Container,
  Divider,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Author from "components/Author";
import Image from "components/Image";
import RenderRichText from "components/RenderRichText";
import Tags from "components/Tags";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useStoryblok } from "services/storyblok";
import { StoryPost, StoryResult } from "types/api";
import { getStory } from "utils/apiHelpers";
import isDev from "utils/isDev";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    params: { slug },
  } = context;

  try {
    const story = await getStory(`posts/${slug[0]}`, {
      version: isDev() ? "draft" : "published",
      language: context.locale,
      cv: Date.now(),
    });

    return {
      props: {
        story,
        preview: context.preview || false,
        locale: context.locale,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default function PostPage(
  props: InferGetServerSidePropsType<
    GetServerSideProps<{
      story: StoryResult<StoryPost>;
      preview: boolean;
      locale?: string;
    }>
  >
) {
  const story = useStoryblok(props.story);

  return (
    <Container maxW="100%">
      <Container maxW="48em">
        <Tags tags={story.content.tags} mb={1} />
        <Heading as="h1" mb={6} textAlign="left">
          {story.content.title}
        </Heading>
        <Text
          as="p"
          fontWeight="500"
          fontSize="lg"
          color={useColorModeValue("gray.500", "gray.400")}
        >
          {story.content.intro}
        </Text>
        <Author
          my={2}
          date={story.first_published_at}
          authorId={story.content.author}
          direction="row"
        />
        <Image
          src={story.content.image.filename}
          alt={story.content.image.alt}
        />
        <Divider
          bgGradient="linear(to-r, teal.200,teal.300, teal.600)"
          borderRadius="sm"
          height={1}
          width="100%"
          my={8}
        />
      </Container>
      <Container maxW="48em" px={4}>
        <Box>{RenderRichText(story.content.body)}</Box>
      </Container>
    </Container>
  );
}
