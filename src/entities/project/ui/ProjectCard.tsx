import { ConfirmApplyModal } from "@/widgets/Modal/ui/ApplyModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  techStack: string[];
  deadline: string;
  type: string;
  summary: string;
  recruitmentSummary: string;
  rolesNeeded: string[];
  participatingCount: number;
  recruitingCount: number;
}

export const ProjectCard = ({ projects }: { projects: Project[] }) => {
  const navigate = useNavigate();
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenApplyModal = (project: Project) => {
    if (project.participatingCount >= project.recruitingCount) return;
    setSelectedProject(project);
    setApplyModalOpen(true);
  };

  const handleApply = () => {
    console.log("지원 완료:", selectedProject?.title);
    setApplyModalOpen(false);
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => {
          const badgeClass =
            project.type === "해커톤"
              ? "bg-blue-600 text-white"
              : project.type === "공모전"
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-700";

          return (
            <div
              key={project.id}
              onClick={() => navigate(`/project/detail/${project.id}`)}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
                >
                  {project.type}
                </span>
                <span>{new Date(project.deadline).toLocaleDateString()}</span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {project.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4">{project.summary}</p>

              <div className="text-xs font-medium text-gray-500 mb-1">
                모집요강
              </div>
              <p className="text-sm text-gray-700 mb-4">
                {project.recruitmentSummary}
              </p>

              <div className="text-xs font-medium text-gray-500 mb-1">
                필요한 역할
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.rolesNeeded.slice(0, 2).map((role) => (
                  <span
                    key={role}
                    className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-800"
                  >
                    {role}
                  </span>
                ))}
                {project.rolesNeeded.length > 2 && (
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded-full text-gray-700">
                    +{project.rolesNeeded.length - 2}
                  </span>
                )}
              </div>

              <div className="text-xs font-medium text-gray-500 mb-1">
                기술 역량
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 text-sm text-gray-800 px-2 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 flex flex-col gap-1">
                  <div>🕒 {project.deadline}</div>
                  <div>
                    👥 ({project.participatingCount}/{project.recruitingCount})
                    인원
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenApplyModal(project);
                  }}
                  disabled={
                    project.participatingCount >= project.recruitingCount
                  }
                  className={`text-sm px-4 py-1.5 rounded-md transition ml-auto ${
                    project.participatingCount >= project.recruitingCount
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-black"
                  }`}
                >
                  참가하기
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 지원 확인 모달 */}
      {selectedProject && (
        <ConfirmApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          onApply={handleApply}
        />
      )}
    </>
  );
};
