import {
  Avatar,
  AspectRatio,
  Divider,
  Box,
  Container,
  Heading,
  HStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import RenderRichText from "components/RenderRichText";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useStoryblok } from "services/storyblok";
import { getAuthor, getStoriesPaths, getStory } from "utils/apiHelpers";
dayjs.extend(advancedFormat);
dayjs.extend(LocalizedFormat);

export async function getStaticProps(context: GetStaticPropsContext) {
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
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getStoriesPaths({ starts_with: "posts" }, locales);
  return {
    paths,
    fallback: "blocking",
  };
}

export default function PostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { locale } = useRouter();
  const { colorMode } = useColorMode();
  const story = useStoryblok(props.story);

  console.log("current locale", locale);

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
          <Text color="gray.500">
            {dayjs(story.first_published_at).locale(locale).format("LL")}
          </Text>
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
