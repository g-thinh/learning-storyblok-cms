import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  StackProps,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StoryAuthor, StoryPost, StoryResult } from "types/api";
import { getAuthor } from "utils/apiHelpers";
import Image from "./Image";
import Author from "./Author";
import Link from "./Link";
import Tags from "./Tags";
import Time from "./Time";

type AuthorProps = {
  date: string;
  authorId: string;
} & StackProps;

export function BlogAuthor({ date, authorId, ...stackProps }: AuthorProps) {
  const [author, setAuthor] = useState<StoryResult<StoryAuthor>>(null);

  useEffect(() => {
    async function getAvatar() {
      try {
        const response = await getAuthor(authorId);
        setAuthor(response);
      } catch (error) {
        console.error("Invalid AuthorID, unable to retrieve", error);
      }
    }
    getAvatar();
  }, [authorId]);

  return (
    <HStack
      mt="auto"
      py={3}
      spacing="3"
      display="flex"
      alignItems="center"
      {...stackProps}
    >
      <Avatar
        size="md"
        name={author?.content?.name}
        src={author?.content?.avatar?.filename}
      />
      <VStack spacing={0} fontSize="sm">
        <Text>{author?.content?.name}</Text>
        <Time time={date} color="gray.500" />
      </VStack>
    </HStack>
  );
}

type PostCardProps = {
  story: StoryResult<StoryPost>;
};

export function TopPost({ story }: PostCardProps) {
  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
        mb={4}
      >
        <Box
          width={{ base: "85%", sm: "90%" }}
          zIndex="2"
          marginLeft={{ base: "0", sm: "5%" }}
          marginTop="5%"
        >
          <Link
            href={`/${story.full_slug}`}
            tabIndex={-1}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              src={story.content.image.filename}
              alt={story.content.image.alt}
              allowZoom
            />
          </Link>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              "radial(teal.600 1px, transparent 1px)",
              "radial(teal.300 1px, transparent 1px)"
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
        <Tags tags={story.content.tags} />
        <Heading marginTop="1">
          <Link
            href={`/${story.full_slug}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {story.content.title}
          </Link>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue("gray.700", "gray.200")}
          fontSize="lg"
        >
          {story.content.intro}
        </Text>
        <Author
          mt={0}
          authorId={story.content.author}
          date={"2021-04-06T19:01:27Z"}
        />
      </Box>
    </Box>
  );
}

export function PostCard({ story }: PostCardProps) {
  return (
    <Flex flexDir="column" height="100%">
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <Link
            href={`/${story.full_slug}`}
            tabIndex={-1}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              src={story.content.image.filename}
              alt={story.content.image.alt}
              allowZoom
            />
          </Link>
        </Box>
      </Box>

      <Flex flexDirection="column" height="100%">
        <Heading fontSize="xl" marginTop="2">
          <Link
            href={`/${story.full_slug}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {story.content.title}
          </Link>
        </Heading>
        <Flex flexGrow={1} flexDir="column">
          <Text as="p" fontSize="md" marginTop="2">
            {story.content.intro}
          </Text>
          <Tags tags={story.content.tags} marginTop="3" />
        </Flex>

        <Author
          authorId={story.content.author}
          date={story.first_published_at}
        />
      </Flex>
    </Flex>
  );
}
