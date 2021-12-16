import { StoryData, StoryblokComponent, Richtext } from "storyblok-js-client";

export type StoryResult<T> = StoryData<StoryblokComponent<string> & T>;

export type Feature = {
  name?: string;
  description?: string;
};

export type Hero = {
  hero_title?: string;
  hero_description?: string;
  hero_image?: SingleImageAsset;
};

export type FeaturesList = {
  features_headline?: string;
  features_description?: string;
  features?: Feature[];
};

export type StoryHome = StoryPost &
  FeaturesList &
  Hero & {
    quote?: Richtext;
  };

export type StoryPost = {
  title?: string;
  body?: Richtext;
  intro?: string;
  image?: SingleImageAsset;
  author?: string;
  tags?: string[];
};

export type Tag = {
  name?: string;
};

type SingleImageAsset = {
  alt?: string;
  copyright?: string;
  fieldtype?: "asset";
  filename?: string;
  focus?: null;
  id?: number;
  name?: string;
  title?: string;
};

export type StoryAuthor = {
  name?: string;
  role?: string;
  avatar?: SingleImageAsset;
  bio?: Richtext;
};

export type StoryblokLinks = {
  links: {
    [link_id: string]: StoryblokLink;
  };
};

export type StoryblokLink = {
  id: number;
  slug: string;
  name: string;
  is_folder: boolean;
  parent_id: number;
  published: boolean;
  path: string;
  position: number;
  uuid: string;
  is_startpage: boolean;
  real_path: string;
};

export type LinkParams = {
  starts_with?: string;
  version?: "published" | "draft";
};
