import { userHandlers } from "./users";
import { projectHandlers } from "./projects";
import { recruitmentHandlers } from "./recruitments";

export const handlers = [
  ...userHandlers,
  ...projectHandlers,
  ...recruitmentHandlers,
];
