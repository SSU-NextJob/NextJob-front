import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/atoms/Button";
import { HeaderNofication } from "./HeaderNofication";
import { useModalStore } from "@/store/modalStore";
import { postCreateProject, type CreateProjectRequest } from "@/apis/project";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { getNotificationList } from "@/apis/notification";
import { useEffect } from "react";
import type { NotificationItem } from "@/apis/notification";
import { googleLogoutAPI } from "@/apis/user";

export const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { onOpenModal } = useModalStore();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const createProjectMutation = useMutation({
    mutationFn: postCreateProject,
    onSuccess: () => {
      alert("프로젝트가 성공적으로 생성되었습니다.");
    },
    onError: (error: Error) => {
      alert(error.message || "프로젝트 생성에 실패했습니다.");
    },
  });

  // userStore 연동
  const { userId, clearUser, isSessionValid } = useUserStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(
    []
  );

  // Google 로그인 mutation
  const googleLoginMutation = useMutation({
    mutationFn: () => {
      // Google OAuth2 authorization endpoint로 직접 리다이렉트
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const redirectUri = encodeURIComponent(
        `${baseUrl}/oauth2/google/callback`
      );

      // OAuth2 authorization URL 생성
      const authUrl = `${baseUrl}/oauth2/authorization/google?redirect_uri=${redirectUri}`;
      window.location.href = authUrl;
      return Promise.resolve(); // 리다이렉트이므로 빈 Promise 반환
    },
    onError: (error: Error) => {
      alert(error.message || "Google 로그인에 실패했습니다.");
    },
  });

  // Google 로그아웃 mutation
  const googleLogoutMutation = useMutation({
    mutationFn: (userId: number) => googleLogoutAPI(userId),
    onSuccess: () => {
      clearUser();
      alert("로그아웃되었습니다.");
    },
    onError: (error: Error) => {
      alert(error.message || "로그아웃에 실패했습니다.");
    },
  });

  useEffect(() => {
    if (!userId) return;

    // 세션 유효성 검사
    if (!isSessionValid()) {
      clearUser();
      return;
    }

    getNotificationList(userId).then((res) => {
      if (res.success) {
        setNotificationList(res.data);
        setUnreadCount(res.data.filter((n) => !n.isRead).length);
      }
    });
  }, [userId, isSessionValid, clearUser]);

  // 페이지 이동 시 알림창 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  return (
    <div className="w-full border-b bg-white px-8 py-4 flex justify-between items-center shadow-sm">
      {/* Left Section: Logo + Name */}
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-bold text-gray-900">
          {/* NextJob */}
          <img src="/src/img/logo.jpg" alt="NextJob 로고" className="w-32" />
        </Link>
      </div>

      {/* Center Section: 메뉴 */}
      <nav className="flex gap-8 text-sm font-semibold">
        <Link
          to="/post"
          className={isActive("/post") ? "text-blue-600" : "text-black"}
        >
          프로젝트 탐색
        </Link>
        <Link
          to="/user"
          className={isActive("/user") ? "text-blue-600" : "text-black"}
        >
          팀원 탐색
        </Link>
        <Link
          to="/workspace"
          className={isActive("/workspace") ? "text-blue-600" : "text-black"}
        >
          워크스페이스
        </Link>
        {userId && (
          <Link
            to="/mypage"
            className={isActive("/mypage") ? "text-blue-600" : "text-black"}
          >
            마이페이지
          </Link>
        )}
      </nav>

      {/* Right Section: 버튼 영역 */}
      <div className="flex items-center gap-4">
        {/* 로그인 상태: 알림, 로그아웃, 프로젝트 생성, 팀원 모집 */}
        {userId ? (
          <>
            {/* Notification */}
            <div
              className="relative cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {isOpen && (
              <HeaderNofication
                notificationList={notificationList}
                setNotificationList={setNotificationList}
                onMarkAsRead={async () => {
                  if (!userId) return;
                  const res = await getNotificationList(userId);
                  if (res.success) {
                    setNotificationList(res.data);
                    setUnreadCount(res.data.filter((n) => !n.isRead).length);
                  }
                }}
                onMarkAllAsRead={async () => {
                  if (!userId) return;
                  const res = await getNotificationList(userId);
                  if (res.success) {
                    setNotificationList(res.data);
                    setUnreadCount(res.data.filter((n) => !n.isRead).length);
                  }
                }}
              />
            )}
            {/* 로그아웃 버튼 */}
            <Button
              onClick={() => userId && googleLogoutMutation.mutate(userId)}
              color={"white"}
              disabled={googleLogoutMutation.isPending}
            >
              {googleLogoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
            </Button>
            {/* 프로젝트 생성, 팀원 모집 */}
            <Button
              onClick={() =>
                onOpenModal("createProject", {
                  onCreate: (data: CreateProjectRequest) => {
                    createProjectMutation.mutate(data);
                  },
                })
              }
              color={"blue"}
            >
              프로젝트 생성
            </Button>
            <Button onClick={() => onOpenModal("recruit")} color={"white"}>
              팀원 모집
            </Button>
          </>
        ) : (
          <>
            {/* 로그아웃 상태: Google 로그인 버튼 */}
            <Button
              onClick={() => googleLoginMutation.mutate()}
              color={"blue"}
              disabled={googleLoginMutation.isPending}
            >
              {googleLoginMutation.isPending ? "로그인 중..." : "Google 로그인"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
