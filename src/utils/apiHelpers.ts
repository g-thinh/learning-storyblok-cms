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
): Promise<Api.StoryResult<Api.StoryPost>> {
  const response = await Storyblok.getStory(slug, params);
  return response.data.story;
}

//Stories are linked to the authors folder and only return a UUID
export async function getAuthor(
  slug: string
): Promise<Api.StoryResult<Api.StoryAuthor>> {
  const response = await Storyblok.getStory(slug, {
    find_by: "uuid",
  });
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

//next thing to do is to prepare all possible slugs with locales
export async function getStoriesPaths(
  params?: Api.LinkParams,
  locales?: string[]
) {
  const response: GetPathsResult = await Storyblok.get("cdn/links", params);
  const { links } = response.data;
  let paths: LinkPath[] = [];

  // get array for slug because of catch all
  for (const locale of locales) {
    Object.keys(links).forEach((link_id) => {
      if (!links[link_id].is_startpage && !links[link_id].is_folder) {
        const slug = links[link_id].name;
        const splittedSlug = slug.split("/");
        const result = {
          params: {
            slug: splittedSlug,
            locale,
          },
        };
        paths.push(result);
      }
    });
  }

  return paths;
}
