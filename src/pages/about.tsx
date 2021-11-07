import { Box, Container, Heading } from "@chakra-ui/react";
import RenderRichText from "components/RenderRichText";
import useTranslation from "hooks/useTranslation";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getStory } from "utils/apiHelpers";

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getStory("about", {
    version: context.preview ? "draft" : "published",
    language: context.locale,
  });

  return {
    props: {
      story: story,
      preview: context.preview || false,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export default function AboutPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story, props.preview, props.locale);
  const { t } = useTranslation();
  return (
    <Container>
      <Container m="auto">
        <Heading as="h1" mb={6} textAlign="center">
          {t("about")}
        </Heading>
        <Container p={4}>
          <Box>{RenderRichText(story.content.body)}</Box>
        </Container>
      </Container>
    </Container>
  );
}
