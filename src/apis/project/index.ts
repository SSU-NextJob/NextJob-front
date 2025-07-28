import { fetcher } from "@/apis";

export interface CreateProjectRequest {
  name: string;
  content?: string;
  creatorId: number;
  startAt: string;
  endAt: string;
  status: string;
  image?: string;
  type: string;
}

export interface ProjectApplyRequest {
  projectId: number;
  userId: number;
}

export interface GetCreatedProjectsResponse {
  success: boolean;
  data: ProjectResponse[]; // 내가 생성한
}

export interface GetJoinedProjectsResponse {
  success: boolean;
  data: {
    createdProject: ProjectResponse[]; // 내가 생성한
    participationProject: ProjectResponse[]; // 내가 참여한
  };
}

export interface GetProjectDetail {
  success: boolean;
  data: ProjectResponse;
}
export interface ProjectResponse {
  projectId: number; // 프로젝트 아이디
  name: string; // 프로젝트 이름
  content: string; // 프로젝트 내용
  type: string; // 프로젝트 종류
  startAt: Date; // 프로젝트 시작일
  endAt: Date; // 프로젝트 종료일
  image?: string; // 프로젝트 이미지
}

// 프로젝트 생성
export const postCreateProject = (data: CreateProjectRequest) => {
  return fetcher<{ message: string; project: any }>("/projects/insert", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
// 프로젝트 상세 조회
export const getProjectDetail = (projectId: number) => {
  return fetcher<GetProjectDetail>(`/projects/${projectId}`, {
    method: "GET",
  });
};

// 프로젝트 지원
export const postProjectApply = ({
  projectId,
  userId,
}: ProjectApplyRequest) => {
  return fetcher<{ message: string }>(`/projects/${projectId}/apply`, {
    method: "POST",
    body: JSON.stringify({ userId: userId }),
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
    body: JSON.stringify({ projectId: projectId }),
    headers: { "Content-Type": "application/json" },
  });
};

// 내가 생성한 프로젝트 리스트 조회
export const getCreatedProjectsAPI = (userId: number) => {
  return fetcher<GetCreatedProjectsResponse>(`/users/${userId}/projects`, {
    method: "GET",
  });
};

// 내가 참여한 프로젝트 리스트 조회
export const getJoinedProjectsAPI = (userId: number) => {
  return fetcher<GetJoinedProjectsResponse>(`/projects?userId=${userId}`, {
    method: "GET",
  });
};
