import { fetcher } from "@/apis";

// 사용자 리스트 조회 쿼리 파라미터 타입
export interface GetUserListParams {
  userType: string;
  search: string;
  page: string;
  pageSize: string;
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

// 사용자가 참여했던 프로젝트 데이터 타입
export interface ParticipationProject {
  project_id: number;
  name: string;
  type: string;
  content: string;
  startAt: Date;
  endAt: Date;
}

// 응답 타입
export interface GetUserListResponse {
  success: boolean;
  data: UserData[];
}
export interface GetUserDetailResponse {
  success: boolean;
  data: UserData;
}
export interface UserProjectListResponse {
  success: boolean;
  data: {
    //createdProject: CreatedProject[];
    participationProject: ParticipationProject[];
  };

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

// 사용자 상세 조회 API 함수
export const getUserDetailAPI = (userId: number) => {
  return fetcher<GetUserDetailResponse>(`/users/${userId}`, {
    method: "GET",
  });
};

// 사용자 참여 프로젝트 API
export const getUserProjectAPI = (userId: number) => {
  return fetcher<UserProjectListResponse>(`/projects?userId=${userId}`, {
    method: "GET",
  });
};