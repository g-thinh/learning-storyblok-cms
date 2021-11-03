import { Text } from "@chakra-ui/react";
import {
  render,
  RenderOptionsProps,
} from "storyblok-rich-text-react-renderer-ts";

export const StoryblokResolvers: RenderOptionsProps = {
  nodeResolvers: {
    paragraph: (children) => <Text mb={4}>{children}</Text>,
  },
  blokResolvers: {},
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
