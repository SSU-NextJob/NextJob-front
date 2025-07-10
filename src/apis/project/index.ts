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

export interface ProjectApplyRequest {
  projectId: number;
  userId: number;
}

// 프로젝트 생성
export const postCreateProject = (data: CreateProjectRequest) => {
  return fetcher<{ message: string; project: any }>("/projects/insert", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// 프로젝트 지원
export const postProjectApply = ({
  projectId,
  userId,
}: ProjectApplyRequest) => {
  return fetcher<{ message: string }>(`/projects/${projectId}/apply`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
    headers: { "Content-Type": "application/json" },
  });
};

// 프로젝트 제안
export const postProjectSuggest = ({
  projectId,
  userId,
}: ProjectApplyRequest) => {
  return fetcher<{ success: boolean }>(`/users/${userId}/suggest`, {
    method: "POST",
    body: JSON.stringify({ project_id: projectId }),
    headers: { "Content-Type": "application/json" },
  });
};
