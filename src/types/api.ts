import { StoryData, StoryblokComponent, Richtext } from "storyblok-js-client";

export interface Session {
  success?: boolean;
  message?: string;
}

export type UserForm = {
  email: string;
  password: string;
};

export type StoryResult = StoryData<
  StoryblokComponent<string> & { title?: string; body?: Richtext }
>;

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
