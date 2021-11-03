import Storyblok from "services/storyblok";
import { StoryParams } from "storyblok-js-client";
import * as Api from "types/api";

export async function getStory(
  slug: string,
  params?: StoryParams
): Promise<Api.StoryResult> {
  const response = await Storyblok.getStory(slug, params);
  return response.data.story;
}
