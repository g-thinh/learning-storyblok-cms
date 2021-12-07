import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import {
  render,
  RenderOptionsProps,
} from "storyblok-rich-text-react-renderer-ts";

export const StoryblokResolvers: RenderOptionsProps = {
  nodeResolvers: {
    paragraph: (children) => (
      <Text fontSize="lg" mb={6}>
        {children}
      </Text>
    ),
    heading: (children, attrs) => {
      return (
        <Heading mb={3} fontSize="xl" fontWeight="bold" as={`h${attrs.level}`}>
          {children}
        </Heading>
      );
    },
    bullet_list: (children) => (
      <UnorderedList spacing={3}>{children}</UnorderedList>
    ),
    list_item: (children) => {
      return <ListItem sx={{ p: { marginBottom: 0 } }}>{children}</ListItem>;
    },
  },
  blokResolvers: {
    Divider: () => (
      <Box
        bgGradient="linear(to-r, teal.200,teal.300, teal.600)"
        borderRadius="sm"
        height={1}
        width="100%"
        my={4}
      />
    ),
  },
  markResolvers: {},
  defaultBlokResolver: (name) => (
    <Text color="red" fontWeight="bold">
      No blok resolver found for {name}
    </Text>
  ),
};

export default function RenderRichText(document: any) {
  return render(document, StoryblokResolvers);
}
