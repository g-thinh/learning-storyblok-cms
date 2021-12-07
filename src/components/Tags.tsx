import { HStack, StackProps, Tag } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getTag } from "utils/apiHelpers";

type BlogTagsProps = {
  tags: string[];
} & StackProps;

export default function Tags({ tags, ...stackProps }: BlogTagsProps) {
  const [storyTags, setStoryTags] = useState([]);
  useEffect(() => {
    async function getStoryTags() {
      try {
        const tagResults = [];
        for (const tag in tags) {
          const response = await getTag(tags[tag]);
          tagResults.push(response.content.name);
        }

        setStoryTags(tagResults);
      } catch (error) {
        console.error("Unable to Fetch Tags, invalid UUIDs", error);
      }
    }
    getStoryTags();
  }, [tags]);

  return (
    <HStack spacing={2} {...stackProps}>
      {storyTags.map((tag) => {
        return (
          <Tag
            size={"md"}
            variant="solid"
            colorScheme="teal"
            textTransform="capitalize"
            key={tag}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
}
