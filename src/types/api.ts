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
