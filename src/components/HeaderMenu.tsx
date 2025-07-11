﻿import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/atoms/Button";
import { RecruitTeamModal } from "@/components/modules/@modal/RecruitmenModal";
import { HeaderAlarm } from "./HeaderAlarm";
import { useModalStore } from "@/store/modalStore";
import { postCreateProject } from "@/apis/project";
import { useMutation } from "@tanstack/react-query";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const dumpProjectList = [
  { id: "1", name: "AI 레시피 생성기" },
  { id: "2", name: "스마트홈 대시보드" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecruitModalOpen, setRecruitModalOpen] = useState(false);
  const location = useLocation();
  const { onOpenModal } = useModalStore();

  const [alarmData, setAlarmData] = useState<Notification[]>([
    {
      id: 1,
      title: "새로운 팀원 합류1",
      description: "Sarah님이 AI 기반 레시피 생성기 프로젝트에 합류했습니다",
      time: "2시간 전",
      unread: true,
    },
    {
      id: 2,
      title: "프로젝트 마감 임박1",
      description: "블록체인 투표 시스템 프로젝트 마감이 3일 남았습니다",
      time: "4시간 전",
      unread: true,
    },
    {
      id: 3,
      title: "새로운 팀원 합류2",
      description: "Sarah님이 AI 기반 레시피 생성기 프로젝트에 합류했습니다",
      time: "2시간 전",
      unread: false,
    },
    {
      id: 4,
      title: "프로젝트 마감 임박2",
      description: "블록체인 투표 시스템 프로젝트 마감이 3일 남았습니다",
      time: "4시간 전",
      unread: false,
    },
  ]);

  const unreadCount = useMemo(
    () => alarmData.filter((n) => n.unread).length,
    [alarmData]
  );

  const handleMarkAsRead = (id: number) => {
    setAlarmData((prev) =>
      prev.map((item) =>
        item.id === id && item.unread ? { ...item, unread: false } : item
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setAlarmData((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const createProjectMutation = useMutation({
    mutationFn: postCreateProject,
    onSuccess: () => {
      alert("프로젝트가 성공적으로 생성되었습니다.");
    },
    onError: (e: any) => {
      alert(e.message || "프로젝트 생성에 실패했습니다.");
    },
  });

  return (
    <div className="w-full border-b bg-white px-8 py-4 flex justify-between items-center shadow-sm">
      {/* Left Section: Logo + Name */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-sm">
          PM
        </div>
        <Link to="/" className="text-xl font-bold text-gray-900">
          ProjectMatch
        </Link>
      </div>

      {/* Center Section: Menu */}
      <nav className="flex gap-8 text-sm font-semibold">
        <Link
          to="/project"
          className={isActive("/project") ? "text-blue-600" : "text-black"}
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
          to="/mypage"
          className={isActive("/mypage") ? "text-blue-600" : "text-black"}
        >
          마이페이지
        </Link>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {isOpen && (
          <HeaderAlarm
            alarmLists={alarmData}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        )}

        {/* Buttons */}
        <Button onClick={() => {}} color={"white"}>
          로그아웃
        </Button>
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
        <Button
          onClick={() =>
            onOpenModal("recruit", {
              projectOptions: [
                { id: "1", name: "예시 프로젝트 1" },
                { id: "2", name: "예시 프로젝트 2" },
              ],
            })
          }
          color={"white"}
        >
          팀원 모집
        </Button>
      </div>

      <RecruitTeamModal
        isOpen={isRecruitModalOpen}
        onClose={() => setRecruitModalOpen(false)}
        onSubmit={(data) => {
          console.log("팀원 모집 데이터:", data);
        }}
        projectOptions={dumpProjectList}
      />
    </div>
  );
};
