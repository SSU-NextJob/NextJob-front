import { fetcher } from "..";

export interface GetPostListResponse {
  success: boolean;
  data: PostResponse[];
}
export interface GetPostDetailResponse {
  success: boolean;
  data: PostDetailResponse;
}

// 게시글 조회 쿼리 파라미터 타입
export interface GetPostListParams {
  type?: string;
  role?: string;
  search?: string;
  userId?: string;
  page: string;
  pageSize: string;
}

export interface PostResponse {
  postId: number; // 게시글 아이디
  title: string; // 게시글 제목
  roleType: string; // 모집 직군
  createAt: Date; // 게시글 작성일
  userId: number; // 등록자 아이디
  userName: string; // 등록자 이름
  project: {
    projectId: number; // 프로젝트 아이디
    projectName: string; // 프로젝트 이름
    projectType: string; // 프로젝트 종류
    startAt: Date; // 프로젝트 시작일
    endAt: Date; // 프로젝트 종료일
  };
}

export interface PostDetailResponse {
  postId: number; // 게시글 아이디
  title: string; // 게시글 제목
  content: string; // 게시글 본문
  roleType: string; // 모집 직군
  createAt: Date; // 게시글 작성일자
  userId: number; // 작성자 아이디
  userName: string; // 작성자 이름
  project: {
    projectId: number; // 프로젝트 아이디
    name: string; // 프로젝트 이름
    content: string; // 프로젝트 내용
    projectType: string; // 프로젝트 종류
    startAt: Date; // 프로젝트 시작일
    endAt: Date; // 프로젝트 종료일
    image: string; // 프로젝트 이미지
  };
}

// 게시글 조회 (= 모집 공고 조회)
export const getPostList = (params: GetPostListParams) => {
  const queryObj: Record<string, string> = {
    page: params.page,
    pageSize: params.pageSize,
  };
  if (params.type) queryObj.type = params.type;
  if (params.role) queryObj.role = params.role;
  if (params.search) queryObj.search = params.search;
  if (params.userId) queryObj.userId = params.userId;

  const query = new URLSearchParams(queryObj).toString();

  return fetcher<GetPostListResponse>(`/posts?${query}`, {
    method: "GET",
  });
};

// 게시글 상세 조회 (= 모집 공고 상세 조회)
export const getPostDetail = (postId: string) => {
  return fetcher<GetPostDetailResponse>(`/posts/${postId}`, {
    method: "GET",
  });
};
