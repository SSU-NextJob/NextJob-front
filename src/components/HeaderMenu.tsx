import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/Button";
import { HeaderNofication } from "./HeaderNofication";
import { useModalStore } from "@/store/modalStore";
import { postCreateProject } from "@/apis/project";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { getNotificationList } from "@/apis/notification";
import { postLogoutAPI } from "@/apis/user";
import { useEffect } from "react";
import type { NotificationItem } from "@/apis/notification";

export const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { onOpenModal } = useModalStore();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  // userStore 연동
  const { userId, setUser, clearUser } = useUserStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(
    []
  );

  const createProjectMutation = useMutation({
    mutationFn: postCreateProject,
    onSuccess: () => {
      alert("프로젝트가 성공적으로 생성되었습니다.");
    },
    onError: (e: any) => {
      alert(e.message || "프로젝트 생성에 실패했습니다.");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => postLogoutAPI(userId!),
    onSuccess: () => {
      localStorage.removeItem("googleAuthData");
      clearUser();
      navigate("/");
    },
    onError: (e: any) => {
      localStorage.removeItem("googleAuthData");
      clearUser();
      navigate("/");
      console.error("로그아웃 API 호출 실패:", e.message);
    },
  });

  /**
   * Google OAuth 로그인 처리 함수
   * 구글 인증 서버로 리다이렉트하여 인가코드를 요청합니다.
   */
  const handleGoogleLogin = () => {
    const clientId =
      "1063797360219-4o0kfk27r300n6nvl6cbbue3frnndddm.apps.googleusercontent.com";
    const redirectUri = "https://nextjob-api.site/oauth2/google/callback";
    const scope =
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const responseType = "code";

    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    let googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    if (isLocalhost) {
      googleAuthUrl += `&state=local`;
    } else {
      googleAuthUrl += `&state=prod`;
    }

    window.location.href = googleAuthUrl;
  };

  useEffect(() => {
    if (!userId) return;
    getNotificationList(userId).then((res) => {
      if (res.success) {
        setNotificationList(res.data);
        setUnreadCount(res.data.filter((n) => !n.isRead).length);
      }
    });
  }, [userId]);

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
        {/* <Link
          to="/workspace"
          className={isActive("/workspace") ? "text-blue-600" : "text-black"}
        >
          워크스페이스
        </Link> */}
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
                className="size-6 text-gray-700 hover:text-gray-900"
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
            <Button onClick={() => logoutMutation.mutate()} color={"white"}>
              로그아웃
            </Button>
            {/* 프로젝트 생성, 팀원 모집 */}
            <Button
              onClick={() =>
                onOpenModal("createProject", {
                  onCreate: (data: any) => {
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
            {/* 로그아웃 상태: 로그인 버튼만 */}
            {/* <Button
              onClick={() => setUser({ userId: 1, userName: "테스트 1" })}
              color={"white"}
            >
              로그인 1
            </Button>
            <Button
              onClick={() => setUser({ userId: 2, userName: "테스트 2" })}
              color={"white"}
            >
              로그인 2
            </Button>
            <Button
              onClick={() => setUser({ userId: 3, userName: "테스트 3" })}
              color={"white"}
            >
              로그인 3
            </Button> */}
            <Button
              onClick={() => {
                // navigate("/login");
                handleGoogleLogin();
              }}
              color={"white"}
            >
              로그인
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
