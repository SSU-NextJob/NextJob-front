// /detail/codes

import { fetcher } from "..";

export interface GetCodeGroupResponse {
  success: boolean;
  data: CodeResponse[];
}

export interface CodeResponse {
  detailCode: string; // 상세 코드
  detailName: string; // 코드명
}

// 코드 목록 조회
export const getGroupCode = (groupCode: "USER_TYPE" | "PROJECT_TYPE") => {
  return fetcher<GetCodeGroupResponse>(`/detail/codes?groupCode=${groupCode}`, {
    method: "GET",
  });
};
