import {
  AspectRatio,
  Avatar,
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import Time from "components/Time";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import NextImage from "next/image";
import { useStoryblok } from "services/storyblok";
import { getAuthor, getStory } from "utils/apiHelpers";

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
  const { colorMode } = useColorMode();
  const story = useStoryblok(props.story);

  return (
    <Container maxW="100%">
      <Container maxW="48em">
        <Text color="grey" textTransform="uppercase">
          Blog
        </Text>
        <Heading as="h1" mb={6} textAlign="left">
          {story.content.title}
        </Heading>
        <Text
          as="p"
          fontWeight="500"
          fontSize="lg"
          color={colorMode === "light" ? "gray.500" : "gray.400"}
        >
          {story.content.intro}
        </Text>
        <HStack spacing={4} my={2} alignItems="center" fontSize="sm">
          <Avatar
            size="md"
            name={props.author.content.name}
            src={props.author.content.avatar.filename}
          />
          <Text>{props.author.content.name}</Text>
          <Time time={story.first_published_at} color="gray.500" />
        </HStack>
        <AspectRatio ratio={16 / 9} borderRadius="md" overflow="hidden" my={3}>
          <NextImage
            layout="fill"
            src={story.content.image.filename}
            placeholder="blur"
            blurDataURL={story.content.image.filename}
          />
        </AspectRatio>
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
