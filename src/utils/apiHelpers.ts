import Storyblok from "services/storyblok";
import {
  StoryParams,
  StoriesParams,
  StoryblokResult,
} from "storyblok-js-client";
import * as Api from "types/api";

export async function getStory(
  slug: string,
  params?: StoryParams
): Promise<Api.StoryResult> {
  const response = await Storyblok.getStory(slug, params);
  return response.data.story;
}

export async function getStories(params?: StoriesParams) {
  const response = await Storyblok.getStories(params);
  return response.data.stories;
}

interface GetPathsResult extends StoryblokResult {
  data: Api.StoryblokLinks;
}

type LinkPath = {
  params: {
    slug: string[];
  };
};

export async function getPaths(params?: Api.LinkParams) {
  const response: GetPathsResult = await Storyblok.get("cdn/links", params);
  const { links } = response.data;
  let paths: LinkPath[] = [];

  // get array for slug because of catch all
  Object.keys(links).forEach((link_id) => {
    if (!links[link_id].is_startpage) {
      const slug = links[link_id].slug;
      const splittedSlug = slug.split("/");
      const result = {
        params: {
          slug: splittedSlug,
        },
      };
      paths.push(result);
    }
  });

  return paths;
}
