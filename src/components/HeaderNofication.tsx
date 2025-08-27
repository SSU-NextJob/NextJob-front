import { readNotification, type NotificationItem } from "@/apis/notification";
import { useNavigate } from "react-router-dom";
import { useEffect as useReactEffect } from "react";
import { useLocation } from "react-router-dom";

import type { Dispatch, SetStateAction } from "react";
interface HeaderNoficationProps {
  notificationList: NotificationItem[];
  setNotificationList: Dispatch<SetStateAction<NotificationItem[]>>;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export const HeaderNofication = ({
  notificationList,
  setNotificationList,
  onMarkAsRead,
}: HeaderNoficationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 페이지 이동 시 HeaderNofication 닫기
  useReactEffect(() => {
    onMarkAsRead(-1); // -1 등으로 무조건 닫기 트리거
  }, [location.pathname, location.search]);

  return (
    <div className="absolute right-36 top-12 w-80 bg-white border shadow-lg rounded-xl z-50 text-left">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <span className="font-semibold text-sm text-gray-900">알림</span>
        {/* <button
          className="text-xs text-blue-600 hover:underline"
          onClick={async () => {
            if (!userId) return;
            await readAllNotification(userId);
            setNotificationList((prev) =>
              prev.map((n) => ({ ...n, isRead: true }))
            );
            onMarkAllAsRead();
          }}
        >
          모두 읽음 처리
        </button> */}
      </div>
      <div className="max-h-64 min-h-[400px] overflow-y-auto flex flex-col">
        {notificationList.length === 0 ? (
          <div className="text-gray-400 text-base text-center">
            알림이 없습니다!
          </div>
        ) : (
          notificationList.map((notification) => (
            <div
              key={notification.notificationId}
              onClick={async () => {
                await readNotification(notification.notificationId);
                setNotificationList((prev) =>
                  prev.map((n) =>
                    n.notificationId === notification.notificationId
                      ? { ...n, isRead: true }
                      : n
                  )
                );
                onMarkAsRead(notification.notificationId);
                navigate("/mypage?tab=alarm");
              }}
              className={`w-full px-4 py-3 border-b cursor-pointer transition ${
                !notification.isRead ? "bg-blue-50" : "bg-white"
              }`}
            >
              <div className="font-semibold text-sm text-gray-900 flex items-center justify-between">
                {notification.title}
                {!notification.isRead && (
                  <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
              <p className="text-sm text-gray-600">{notification.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {notification.createdAt
                  ? new Date(
                      notification.createdAt.replace(" ", "T")
                    ).toLocaleString()
                  : ""}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
