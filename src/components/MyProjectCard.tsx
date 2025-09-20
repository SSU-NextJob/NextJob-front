import type { PostResponse } from "@/apis/post";
import type { ProjectResponse } from "@/apis/project";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import normalizedDate from "@/utils/normalizedDate";
import { useNavigate } from "react-router-dom";

interface MyProjectsCardProps {
  participatingProjects: ProjectResponse[];
  createdProjects: ProjectResponse[];
  recruitPostList: PostResponse[];
}

export const MyProjectsCard = ({
  participatingProjects,
  createdProjects,
  recruitPostList,
}: MyProjectsCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* 참여중인 프로젝트 */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700 text-left">
          참여중인 프로젝트
        </h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {participatingProjects.map((project) => {
            return (
              <div
                key={project.projectId}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col h-full text-left"
              >
                <div className="text-xs font-medium text-gray-500 flex justify-between mb-1 text-left">
                  <Badge type={project.type} />
                  <span> ~ {normalizedDate(project.endAt)}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 text-left">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 text-left">
                  {project.content}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-3 text-left">
                  {/* <span className="bg-gray-200 px-2 py-0.5 rounded-full">
                    {project.role}
                  </span> 
                  <span
                    key={project.type}
                    className="bg-gray-200 px-2 py-0.5 rounded-full"
                  >
                    {project.type}
                  </span> */}
                </div>
                {/* <div className="text-sm text-gray-500 text-right">
                  ⏱ {project.dDay}일 남음
                </div> */}
                <div className="flex gap-2 mt-auto justify-end">
                  <Button
                    onClick={() => {
                      if (project.workspaceId) {
                        navigate(
                          `/workspace?workspaceId=${project.workspaceId}`
                        );
                      } else {
                        navigate("/workspace");
                      }
                    }}
                    color={"gray"}
                  >
                    {/* 상세보기 */}
                    워크스페이스
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 내가 만든 프로젝트 */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700 text-left">
          내가 만든 프로젝트
        </h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {createdProjects.map((project) => {
            return (
              <div
                key={project.projectId}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col h-full text-left"
              >
                <div className="text-xs font-medium text-gray-500 flex justify-between mb-1 text-left">
                  <Badge type={project.type} />
                  <span>~ {normalizedDate(project.endAt)}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 text-left">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 text-left">
                  {project.content}
                </p>
                <div className="flex justify-between items-center mt-auto text-left">
                  {/* <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                  {c.role}
                </span> */}
                  <span className="text-xs text-gray-500">
                    {/* 👥 {project.membersCount}명 팀원 */}
                  </span>
                </div>
                <div className="flex gap-2 mt-3 justify-end">
                  {/* 
                  현재 API 없음
                  <Button onClick={() => {}} color={"blue"}>
                    수정
                  </Button> */}
                  {/*
                  UX적 문제. 현재 계획 X
                  <Button onClick={() => {}} color={"blue"}>
                    모집
                  </Button> */}
                   <Button
                    onClick={() => {
                      if (project.workspaceId) {
                        navigate(
                          `/workspace?workspaceId=${project.workspaceId}`
                        );
                      } else {
                        navigate("/workspace");
                      }
                    }}
                    color={"gray"}
                  >
                    {/* 상세보기 */}
                    워크스페이스
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 모집 공고 */}
      <section>
        <h2 className="text-lg font-bold mb-4 text-gray-700 text-left">
          모집 공고
        </h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {recruitPostList.map((post) => {
            return (
              <div
                key={post.postId}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition text-left cursor-pointer"
                onClick={() => navigate(`/post/detail/${post.postId}`)}
              >
                <div className="text-xs font-medium text-gray-500 flex justify-between mb-1 text-left">
                  <Badge type={post.project.type} />
                  <span>{normalizedDate(post.createAt)}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 text-left">
                  {post.title}
                </h3>
                <div className="text-xs text-gray-500 mb-1 text-left">
                  연결된 프로젝트
                </div>
                <div className="text-xs font-medium mb-2 text-left">
                  {post.project.projectName ? post.project.projectName : "-"}
                </div>
                <div className="text-xs text-gray-500 mb-1 text-left">
                  모집 역할
                </div>
                <div className="flex flex-wrap gap-2 mb-2 text-left">
                  <span
                    key={post.roleType}
                    className="bg-gray-200 px-2 py-0.5 text-xs rounded-full"
                  >
                    {post.roleType}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {normalizedDate(post.project.startAt)} ~{" "}
                    {normalizedDate(post.project.endAt)}
                  </div>
                </div>
                {/* <div className="text-xs text-gray-500">
                  👥 {project.applicants}명 지원 • ⏱ {project.dDay}일 남음
                </div> */}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
