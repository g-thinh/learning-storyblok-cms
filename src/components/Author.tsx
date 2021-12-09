import {
  Avatar,
  HStack,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { StoryAuthor, StoryResult } from "types/api";
import { getAuthor } from "utils/apiHelpers";
import Time from "./Time";
import { useRouter } from "next/router";

type AuthorProps = {
  date: string;
  authorId: string;
} & StackProps;

export default function Author({
  date,
  authorId,
  direction,
  ...stackProps
}: AuthorProps) {
  const [author, setAuthor] = useState<StoryResult<StoryAuthor>>(null);
  const { locale } = useRouter();

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
  }, [authorId, locale]);

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
      <Stack
        spacing={direction ? 3 : 0}
        fontSize="sm"
        alignItems="start"
        direction={direction ?? "column"}
      >
        <Text>{author?.content?.name}</Text>
        <Time time={date} color="gray.500" />
      </Stack>
    </HStack>
  );
}
