import { fetcher } from "@/apis";

// 사용자 리스트 조회 쿼리 파라미터 타입
export interface GetUserListParams {
  userType: string;
  search: string;
  page: string;
  pageSize: string;
}

// 사용자 리스트 조회 쿼리 파라미터 타입
export interface GetUserDetailParams {
  userId: string;
}

// 사용자 데이터 타입
export interface UserData {
  userId: number;
  name: string;
  email: string;
  description: string | null;
  techStack: string | null;
  profileImage: string;
  userType: string;
  isVisible: boolean;
}

// 사용자가 생성했던 프로젝트 데이터 타입
export interface CreatedProject {
  projectId: number;
  name: string;
  type: string;
  content: string;
  startAt: string;
  endAt: string;
}

// 사용자가 참여했던 프로젝트 데이터 타입
export interface ParticipationProject {
  project_id: number;
  name: string;
  type: string;
  content: string;
  startAt: string;
  endAt: string;
}


// 사용자가 생성,참여했던 프로젝트 list
export interface GetUserProjectResponse {
  success: boolean;
  data: {
    createdProject: CreatedProject[];
    participationProject: ParticipationProject[];
  };
}

export interface UserProjectData {
  createdProject: CreatedProject[];
  participationProject: ParticipationProject[];
}
// 응답 타입
export interface GetUserListResponse {
  success: boolean;
  data: UserData[];
}

// 사용자 리스트 조회 API 함수
export const getUserListAPI = (params: GetUserListParams) => {
  const query = new URLSearchParams({
    userType: params.userType,
    search: params.search,
    page: params.page,
    pageSize: params.pageSize,
  }).toString();
  return fetcher<GetUserListResponse>(`/users?${query}`, {
    method: "GET",
  });
};

// 사용자 리스트 조회 API 함수
export const getUserDetailAPI = (params: GetUserDetailParams) => {
  const query = new URLSearchParams({
    userId: params.userId,
  }).toString();
  return fetcher<GetUserListResponse>(`/users/:id?${query}`, {
    method: "GET",
  });
};

export const getUserProjectAPI = (params: GetUserDetailParams) => {
  const query = new URLSearchParams({
    userId: params.userId,
  }).toString();
  return fetcher<GetUserProjectResponse>(`/projects?${query}`, {
    method: "GET",
  });
};

