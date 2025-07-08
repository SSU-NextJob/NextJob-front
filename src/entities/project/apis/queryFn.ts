import { fetcher } from "@/shared/apis";
// import type { CreateProjectRequest } from ".";

export interface CreateProjectRequest {
  name: string;
  content?: string;
  creatorId: number;
  startAt: string;
  endAt: string;
  projectType: string;
  image?: string;
  type: string;
}

export const postCreateProject = (data: CreateProjectRequest) => {
  return fetcher<{ message: string; project: any }>("/projects/insert", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
