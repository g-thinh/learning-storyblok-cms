import {
  Avatar,
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "components/Image";
import RenderRichText from "components/RenderRichText";
import Time from "components/Time";
import Author from "components/Author";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getAuthor, getStory } from "utils/apiHelpers";
import Tags from "components/Tags";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    params: { slug },
  } = context;

  const story = await getStory(`posts/${slug[0]}`, {
    version: context.preview ? "draft" : "published",
    language: context.locale,
    cv: Date.now(),
  });

  const author = await getAuthor(story.content.author);

  return {
    props: {
      story: story,
      author: author,
      preview: context.preview || false,
      locale: context.locale,
    },
  };
}

export default function PostPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
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
