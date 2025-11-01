import { fetcher } from "@/apis";

// 사용자 리스트 조회 쿼리 파라미터 타입
export interface GetUserListParams {
  myUserId: number;
  userType?: string;
  search?: string;
  page?: string;
  pageSize?: string;
}

// 사용자 데이터 타입
export interface UserData {
  userId: number;
  name: string;
  email: string;
  description: string;
  techStack: string;
  profileImage: string;
  userType: string;
  isVisible: boolean;
}

// 사용자가 참여했던 프로젝트 데이터 타입
export interface ParticipationProject {
  projectId: number;
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
export interface PatchUserDetailResponse {
  success: boolean;
  data: null;
}

// 사용자 리스트 조회 API 함수
export const getUserListAPI = (params: GetUserListParams) => {
  const searchParams = new URLSearchParams();

  // undefined가 아닌 값만 추가
  if (params.userType !== undefined) {
    searchParams.append("userType", params.userType);
  }
  if (params.search !== undefined) {
    searchParams.append("search", params.search);
  }
  if (params.page !== undefined) {
    searchParams.append("page", params.page);
  }
  if (params.pageSize !== undefined) {
    searchParams.append("pageSize", params.pageSize);
  }
  if (params.myUserId !== undefined) {
    searchParams.append("myUserId", params.myUserId);
  }

  const query = searchParams.toString();
  return fetcher<GetUserListResponse>(`/users?${query}`, {
    method: "GET",
    // body: JSON.stringify({
    //   myUserId: params.myUserId,
    // }),
    headers: { "Content-Type": "application/json" },
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

// 사용자 정보 수정 API
export const PatchUserDetailAPI = (
  userId: number,
  name: string,
  techStack: string,
  description: string,
  userType: string,
  profileImage?: string
) => {
  return fetcher<PatchUserDetailResponse>(`/users/me`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: userId,
      name: name,
      techStack: techStack,
      description: description,
      userType: userType,
      profileImage: profileImage,
    }),
  });
};

// 사용자 노출 여부 수정 API
export const PatchUserVisibleAPI = (userId: number, isVisible: boolean) => {
  return fetcher<PatchUserDetailResponse>(`/users/visibility`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: userId,
      isVisible: isVisible,
    }),
  });
};

// 로그아웃 응답 타입
export interface LogoutResponse {
  success: boolean;
  data: null;
  error: null;
}

// 로그아웃 API
export const postLogoutAPI = (userId: number) => {
  return fetcher<LogoutResponse>(`/oauth2/google/logout`, {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
    }),
  });
};
