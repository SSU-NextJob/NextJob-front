import { Button } from "@/shared/ui/atoms/Button";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  date: string;
  role: string;
  type: string;
  applicants?: number;
  dDay?: number;
  teamSize?: number;
  linkedProject?: string;
  rolesNeeded?: string[];
}

interface MyProjectsCardProps {
  participatingProjects: ProjectItem[];
  createdProjects: ProjectItem[];
  recruitmentPosts: ProjectItem[];
}

export const MyProjectsCard = ({
  participatingProjects,
  createdProjects,
  recruitmentPosts,
}: MyProjectsCardProps) => {
  console.log("11", participatingProjects, createdProjects, recruitmentPosts);
  return (
    <div className="flex flex-col gap-10">
      {/* 참여중인 프로젝트 */}
      <section>
        <h2 className="text-lg font-bold mb-4">참여중인 프로젝트</h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {participatingProjects.map((project) => {
            const badgeClass =
              project.type === "해커톤"
                ? "bg-blue-600 text-white"
                : project.type === "공모전"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700";
            return (
              <div
                key={project.id}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs font-medium text-gray-500 flex justify-between mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
                  >
                    {project.type}
                  </span>
                  <span>{project.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  <span className="bg-gray-200 px-2 py-0.5 rounded-full">
                    {project.role}
                  </span>
                  <span
                    key={project.type}
                    className="bg-gray-200 px-2 py-0.5 rounded-full"
                  >
                    {project.type}
                  </span>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  ⏱ {project.dDay}일 남음
                </div>
                <div className="flex gap-2 mt-3 justify-end">
                  <Button
                    content={"프로젝트 보러가기"}
                    onClick={{}}
                    color={"gray"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 내가 만든 프로젝트 */}
      <section>
        <h2 className="text-lg font-bold mb-4">내가 만든 프로젝트</h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {createdProjects.map((project) => {
            const badgeClass =
              project.type === "해커톤"
                ? "bg-blue-600 text-white"
                : project.type === "공모전"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700";
            return (
              <div
                key={project.id}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs font-medium text-gray-500 flex justify-between mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
                  >
                    {project.type}
                  </span>
                  <span>{project.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {project.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  {/* <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                  {c.role}
                </span> */}
                  <span className="text-xs text-gray-500">
                    👥 {project.membersCount}명 팀원
                  </span>
                </div>
                <div className="flex gap-2 mt-3 justify-end">
                  <Button content={"관리"} onClick={{}} color={"gray"} />
                  <Button content={"모집"} onClick={{}} color={"blue"} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 모집 게시물 */}
      <section>
        <h2 className="text-lg font-bold mb-4">모집 게시물</h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {recruitmentPosts.map((project) => {
            const badgeClass =
              project.type === "해커톤"
                ? "bg-blue-600 text-white"
                : project.type === "공모전"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700";
            return (
              <div
                key={project.id}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs font-medium text-gray-500 flex justify-between mb-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
                  >
                    {project.type}
                  </span>
                  <span>{project.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
                <div className="text-xs text-gray-500 mb-1">
                  연결된 프로젝트
                </div>
                <div className="text-xs font-medium mb-2">
                  {project.linkedProject}
                </div>
                <div className="text-xs text-gray-500 mb-1">모집 역할</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.rolesNeeded?.slice(0, 2).map((role) => (
                    <span
                      key={role}
                      className="bg-gray-200 px-2 py-0.5 text-xs rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                  {project.rolesNeeded && project.rolesNeeded.length > 2 && (
                    <span className="bg-gray-200 px-2 py-0.5 text-xs rounded-full">
                      +{project.rolesNeeded.length - 2}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  👥 {project.applicants}명 지원 • ⏱ {project.dDay}일 남음
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
