import Storyblok from "services/storyblok";
import { StoryParams, StoryblokResult } from "storyblok-js-client";
import * as Api from "types/api";

export async function getStory(
  slug: string,
  params?: StoryParams
): Promise<Api.StoryResult> {
  const response = await Storyblok.getStory(slug, params);
  return response.data.story;
}

interface GetPathsResult extends StoryblokResult {
  data: Api.StoryblokLinks;
}

type LinkPath = {
  params: {
    slug: string[];
  };
};

export async function getPaths() {
  const response: GetPathsResult = await Storyblok.get("cdn/links");
  const { links } = response.data;
  console.log("Links", links);
  let paths: LinkPath[] = [];

  // get array for slug because of catch all
  Object.keys(links).forEach((link_id) => {
    if (!links[link_id].is_folder || links[link_id].slug != "home") {
      const slug = links[link_id].slug;
      const splittedSlug = slug.split("/");
      const result = {
        params: {
          slug: splittedSlug,
        },
      };
      console.log("result", result);
      paths.push(result);
    }
  });

  return paths;
}
