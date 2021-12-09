import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { PostCard, TopPost } from "components/PostCard";
import RenderRichText from "components/RenderRichText";
import useTranslation from "hooks/useTranslation";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useStoryblok } from "services/storyblok";
import { getStories, getStory } from "utils/apiHelpers";
import isDev from "utils/isDev";

export async function getStaticProps(context: GetStaticPropsContext) {
  const allStories = await getStories({
    starts_with: "posts",
    is_startpage: 0,
    version: isDev() ? "draft" : "published",
    language: context.locale,
    cv: Date.now(),
  });

  const story = await getStory("posts", {
    version: isDev() ? "draft" : "published",
    language: context.locale,
  });

  return {
    props: {
      story: story,
      stories: allStories,
      preview: context.preview || false,
      locale: context.locale,
    },
    revalidate: 60 * 60,
  };
}

export default function PostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const story = useStoryblok(props.story);
  const { t } = useTranslation();

  return (
    <Container maxW={{ base: "100%", sm: "5xl", lg: "6xl" }}>
      <Heading as="h2" marginTop="5">
        {t("whatsNew")}
      </Heading>
      <TopPost story={props.stories[0]} />
      <Heading as="h2" marginTop="5">
        {t("latestArticles")}
      </Heading>
      <Divider color="gray.500" marginY="5" />
      <Grid
        gap={8}
        gridAutoRows="1fr"
        gridTemplateColumns="repeat(auto-fill,minmax(300px,1fr))"
      >
        {props.stories.map((story, index) => {
          if (index > 0) {
            return (
              <GridItem key={story.id}>
                <PostCard key={story.id} story={story} />
              </GridItem>
            );
          }
        })}
      </Grid>
      <Divider color="gray.500" marginY="5" />
      <Box>{RenderRichText(story.content.body)}</Box>
    </Container>
  );
}
