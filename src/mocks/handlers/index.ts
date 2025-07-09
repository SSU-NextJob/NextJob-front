import { userHandlers } from "./users";
import { projectHandlers } from "./projects";

export const handlers = [...userHandlers, ...projectHandlers];
