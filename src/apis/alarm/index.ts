import { fetcher } from "..";

export interface GetNotificationListResponse {
  success: boolean;
  data: NotificationResponse[];
}
export interface ReadNotificationResponse {
  success: boolean;
  data: null;
}

export interface NotificationResponse {
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

// 알림 목록 조회
export const getPostDetail = (userId: number) => {
  return fetcher<GetNotificationListResponse>(`/notifications/${userId}`, {
    method: "GET",
  });
};

// 알림 읽음 처리
export const readNotification = (notificationId: number) => {
  return fetcher<ReadNotificationResponse>(`/notifications/${notificationId}/read`, {
    method: "PATCH",
  });
};

// 알림 전체 읽음 처리
export const readAllNotification = (userId: number) => {
  return fetcher<ReadNotificationResponse>(`/notifications/read-all`, {
    method: "PATCH",
    body: JSON.stringify({
      userId: userId,
    }),
  });
};
