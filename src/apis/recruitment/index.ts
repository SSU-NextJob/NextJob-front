import { fetcher } from "@/apis";

export interface RecruimentRequest {
  userId: number;
  userName: string;
  projectId: number;
  title: string;
  content: string;
  roleType: string;
}

// 모집 공고 생성 (팀원 모집 - 게시글 작성)
export const postRecruiment = (data: RecruimentRequest) => {
  return fetcher<{
    success: boolean;
  }>("/posts/insert", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
