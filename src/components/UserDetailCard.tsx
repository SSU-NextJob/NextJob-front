import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/atoms/Button";
import type { UserData, UserProjectData } from "@/apis/user";

export const UserDetailCard = ({
  user,
  userProject,
}: {
  user: UserData;
  userProject: UserProjectData;
}) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore();
  console.log("project", userProject);
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
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-1">소개</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {user.description}
          </p>
        </div>

        {/* 경력 및 가능시간 */}
        <div className="mb-6 grid grid-cols-2 gap-4 max-w-md">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              개발 분야
            </h3>
            <p className="text-sm text-gray-700">{user.userType}</p>
          </div>
          {/* <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              가능 시간
            </h3>
            <p className="text-sm text-gray-700">{availability}</p>
          </div> */}
        </div>

        {/* 기술 스택 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            보유 기술
          </h3>
          <div className="flex flex-wrap gap-2">
            {user?.techStack && (
              <span
                key={user.techStack}
                className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
              >
                {user.techStack}
              </span>
            )}

            {/* {user.techStack
                ?.split(",")
                .map((s) => s.trim()) // 공백 제거
                .slice(0, 3)
                .map((stack: string) => (
                  <span
                    key={stack}
                    className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
                  >
                    {stack}
                  </span>
                ))} */}
          </div>
        </div>

        {/* 생성 프로젝트 */}
        {userProject?.createdProject?.length && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              생성 프로젝트
            </h3>
            <div className="flex gap-3">
              {userProject?.createdProject?.map((project) => (
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
                    생성일: {project.startAt}
                  </p>
                  <p className="text-xs text-gray-500">
                    마감일: {project.endAt}
                  </p>
                  {/* <span className="absolute top-4 right-4 border text-xs px-2 py-0.5 rounded-full">
                  {project.role}
                </span> */}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 참여 프로젝트 */}
        {userProject?.participationProject?.length && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              참여 프로젝트
            </h3>
            <div className="flex gap-3">
              {userProject?.participationProject?.map((project) => (
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
                    생성일: {project.startAt}
                  </p>
                  <p className="text-xs text-gray-500">
                    마감일: {project.endAt}
                  </p>
                  {/* <span className="absolute top-4 right-4 border text-xs px-2 py-0.5 rounded-full">
                  {project.role}
                </span> */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex justify-end">
          <Button
            onClick={() => onOpenModal("suggest", { memberId: userId })}
            color={"blue"}
          >
            제안하기
          </Button>
        </div>
      </div>
    </div>
  );
};
