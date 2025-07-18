import { fetcher } from "..";

export interface NotificationItem {
  notificationId: number;
  title: string;
  content: string;
  isRead: boolean;
  notificationType: string;
  createdAt: string; // datetime string
}

export interface GetNotificationListResponse {
  success: boolean;
  data: NotificationItem[];
  error: null | string;
}
export interface ReadNotificationResponse {
  success: boolean;
  data: null;
  error: null | string;
}

// 알림 목록 조회
export const getNotificationList = (userId: number) => {
  return fetcher<GetNotificationListResponse>(
    `/notifications?userId=${userId}`,
    {
      method: "GET",
    }
  );
};

// 알림 읽음 처리
export const readNotification = (notificationId: number) => {
  return fetcher<ReadNotificationResponse>(
    `/notifications/${notificationId}/read`,
    {
      method: "PATCH",
    }
  );
};

// 알림 전체 읽음 처리
export const readAllNotification = (userId: number) => {
  return fetcher<ReadNotificationResponse>(`/notifications/read-all`, {
    method: "PATCH",
    body: JSON.stringify({ userId }),
    headers: { "Content-Type": "application/json" },
  });
};
