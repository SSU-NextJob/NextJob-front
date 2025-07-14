import { userHandlers } from "./users";
import { projectHandlers } from "./projects";
import { recruitmentHandlers } from "./recruitments";
import { postsHandlers } from "./posts";

export const handlers = [
  ...userHandlers,
  ...projectHandlers,
  ...recruitmentHandlers,
  ...postsHandlers,
];
