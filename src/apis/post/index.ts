import { fetcher } from "..";

export interface GetPostDetailResponse {
  success: boolean;
  data: PostResponse;
}

export interface PostResponse {
  postId: number; // 게시글 아이디
  title: string; // 게시글 제목
  content: string; // 게시글 본문
  roleType: string; // 모집 직군
  createAt: Date; // 게시글 작성일자
  userId: number; // 작성자 아이디
  userName: string; // 작성자 이름
  project: {
    project_id: number; // 프로젝트 아이디
    name: string; // 프로젝트 이름
    content: string; // 프로젝트 내용
    type: string; // 프로젝트 종류
    startAt: Date; // 프로젝트 시작일
    endAt: Date; // 프로젝트 종료일
    image: string; // 프로젝트 이미지
  };
}

// 게시글 상세 조회 (= 모집 공고 상세 조회)
export const getPostDetail = (postId: number) => {
  return fetcher<GetPostDetailResponse>(`/posts/${postId}`, {
    method: "GET",
  });
};
