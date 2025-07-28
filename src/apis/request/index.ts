import { fetcher } from "..";

export interface ProjectSummary {
  projectId: number;
  name: string;
  content: string;
  status: string;
  startAt: string; // datetime string
  endAt: string; // datetime string
  image: string;
}

export interface RequestItem {
  requestId: number;
  requestDate: string; // datetime string
  requestStatus: string;
  project: ProjectSummary;
}

export interface RequestsList {
  apply: RequestItem[];
  suggest: RequestItem[];
}

export interface GetRequestsResponse {
  success: boolean;
  data: {
    incomingRequests: RequestsList;
    outgoingRequests: RequestsList;
  };
  error: null | string;
}

// 요청 목록 조회 API
export const getRequests = (userId: number) => {
  return fetcher<GetRequestsResponse>(`/requests?userId=${userId}`, {
    method: "GET",
  });
};

export interface PostRequestReplyResponse {
  success: boolean;
  data: null;
  error: null;
}

// 요청 수락/거절 API
export const postRequestReply = (
  requestId: number,
  status: "ACCEPTED" | "REJECTED"
) => {
  return fetcher<PostRequestReplyResponse>(`/requests/${requestId}/reply`, {
    method: "POST",
    body: JSON.stringify({ status }),
    headers: { "Content-Type": "application/json" },
  });
};
