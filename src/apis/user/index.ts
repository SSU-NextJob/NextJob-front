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
