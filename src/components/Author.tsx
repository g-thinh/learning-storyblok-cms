import {
  Avatar,
  AvatarProps,
  HStack,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { StoryAuthor, StoryResult } from "types/api";
import { getAuthor } from "utils/apiHelpers";
import Time from "./Time";

type AuthorProps = {
  date?: string;
  showRole?: boolean;
  authorId: string;
  avatarSize?: AvatarProps["size"];
} & StackProps;

export default function Author({
  date,
  authorId,
  direction,
  avatarSize = "md",
  showRole = false,
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
        size={avatarSize}
        name={author?.content?.name}
        src={author?.content?.avatar?.filename}
      />
      <Stack
        spacing={direction ? 2 : 0}
        fontSize="sm"
        alignItems="start"
        direction={direction ?? "column"}
      >
        <Text>{author?.content?.name}</Text>
        {showRole && (
          <Text fontStyle="italic" color="gray.600">
            {author?.content?.role}
          </Text>
        )}
        {date && <Time time={date} color="gray.500" />}
      </Stack>
    </HStack>
  );
}
