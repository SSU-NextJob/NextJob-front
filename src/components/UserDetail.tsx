import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/atoms/Button";
import { Loading } from "@/components/atoms/Loading";
import type { UserData, UserProjectListResponse } from "@/apis/user";
import normalizedDate from "@/utils/normalizedDate";

interface UserDetailProps {
  userDetail?: UserData;
  userProjectList?: UserProjectListResponse;
  isLoading: boolean;
  error: string | null;
}

export const UserDetail = ({
  userDetail,
  userProjectList,
  isLoading,
  error,
}: UserDetailProps) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore();

  if (isLoading) return <Loading />;

  if (error) return <div className="text-red-500">{error}</div>;

  if (!userDetail || !userProjectList) return null;

  return (
    <div className="w-full min-h-screen bg-white text-gray-800 px-6 py-10">
      {/* 뒤로가기 */}
      <div className="mb-6 flex justify-start">
        <Button onClick={() => navigate(-1)} color={"white"}>
          ← 뒤로가기
        </Button>
      </div>

      {/* 전체 레이아웃 */}
      <div className="text-left">
        {/* 이름 + 역할 + 위치 */}
        <div className="flex items-start gap-4 mb-6">
          {userDetail.profileImage ? (
            <img
              src={userDetail.profileImage}
              alt={"프로필 이미지"}
              className="w-16 h-16 bg-gray-200 rounded-full"
            />
          ) : (
            <span className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {userDetail.name}
            </h1>
            <p className="text-sm text-gray-600">{userDetail.email}</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-1">소개</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {userDetail.description}
          </p>
        </div>

        {/* 경력 및 가능시간 */}
        <div className="mb-6 grid grid-cols-2 gap-4 max-w-md">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              개발 분야
            </h3>
            <p className="text-sm text-gray-700">{userDetail.userType}</p>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            보유 기술
          </h3>
          <div className="flex flex-wrap gap-2">
            {userDetail?.techStack && (
              <span
                key={userDetail.techStack}
                className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
              >
                {userDetail.techStack}
              </span>
            )}
          </div>
        </div>

        {/* 참여 프로젝트 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            참여 프로젝트
          </h3>
          {userProjectList?.data.participationProject.length > 0 ? (
            <div className="flex gap-3">
              {userProjectList?.data.participationProject?.map((project) => (
                <div
                  key={project.name}
                  className="border rounded-lg p-4 bg-gray-50 relative max-w-2xl"
                >
                  <h4 className="text-sm font-bold text-gray-900">
                    {project.name}
                  </h4>
                  <p className="text-sm text-gray-700 mb-1">{project.type}</p>
                  <p className="text-sm text-gray-700 mb-1">
                    {project.content}
                  </p>
                  <p className="text-xs text-gray-500">
                    생성일: {normalizedDate(project.startAt)}
                  </p>
                  <p className="text-xs text-gray-500">
                    마감일: {normalizedDate(project.endAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">참여한 프로젝트가 없습니다</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
          <Button
            onClick={() =>
              onOpenModal("suggest", { memberId: userDetail.userId })
            }
            color={"blue"}
          >
            제안하기
          </Button>
        </div>
      </div>
    </div>
  );
};
