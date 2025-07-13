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

export interface GetProjectListResponse {
  success: boolean;
  data: ProjectResponse[];
}

export interface ProjectResponse {
  projectId: number; // 프로젝트 아이디
  name: string; // 프로젝트 이름
  content: string; // 프로젝트 내용
  type: string; // 프로젝트 종류
  start_at: Date; // 프로젝트 시작일
  end_at: Date; // 프로젝트 종료일
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

// 내가 생성한 프로젝트 리스트 조회
export const getProjectListAPI = (userId: number) => {
  return fetcher<GetProjectListResponse>(`/users?userId=${userId}`, {
    method: "GET",
  });
};
