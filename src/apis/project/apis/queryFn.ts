import { fetcher } from "@/apis";

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

export const postProjectApply = (projectId: number, userId: number) => {
  return fetcher<{ message: string }>(`/projects/${projectId}/apply`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
    headers: { "Content-Type": "application/json" },
  });
};
