import { Button } from "@/shared/ui/atoms/Button";
import { ConfirmApplyModal } from "@/widgets/Modal/ui/ApplyModal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  techStack: string[];
  deadline: string;
  type: string;
  summary: string;
  recruitmentSummary: string;
  roles: string[];
  requirements: string[];
  benefits: string[];
  location: string;
  membersNeeded: number;
  description: string;
  creator: string;
}

export const ProjectDetailCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleOpenApplyModal = (project: Project) => {
    // if (project.participatingCount >= project.recruitingCount) return;
    setSelectedProject(project);
    setApplyModalOpen(true);
  };
  const handleApply = () => {
    console.log("지원 완료:", selectedProject?.title);
    setApplyModalOpen(false);
  };
  const badgeClass =
    project.type === "해커톤"
      ? "bg-blue-600 text-white"
      : project.type === "공모전"
        ? "bg-red-500 text-white"
        : "bg-gray-200 text-gray-700";
  return (
    <>
      <div className="w-full min-h-screen bg-white text-gray-800 p-10">
        {/* 뒤로가기 */}
        <div className="mb-6 flex justify-start">
          <Button
            content={"← 뒤로가기"}
            onClick={() => navigate(-1)}
            color={"white"}
          />
        </div>

        {/* 전체 레이아웃 */}
        <div className="w-full text-left">
          {/* 제목 + 타입 */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <span className={` text-xs px-3 py-1 rounded-full ${badgeClass}`}>
              {project.type}
            </span>
          </div>

          {/* 메타 정보 */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span>📅 마감일: {project.deadline}</span>
            <span>📍 위치: {project.location}</span>
            <span>👥 모집인원: {project.membersNeeded}명</span>
          </div>

          {/* 설명 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">프로젝트 설명</h2>
            <p className="text-sm text-gray-700">{project.description}</p>
          </div>

          {/* 모집요강 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">모집요강</h2>
            <p className="text-sm text-gray-700">
              {project.recruitmentSummary}
            </p>
          </div>

          {/* 필요한 역할 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">필요한 역할</h2>
            <div className="flex flex-wrap gap-2">
              {project.roles.map((role) => (
                <span
                  key={role}
                  className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* 기술 역량 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">기술 역량</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 요구사항 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">요구사항</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {project.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>

          {/* 혜택 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">혜택</h2>
            <div className="flex flex-wrap gap-2">
              {project.benefits.map((b) => (
                <span
                  key={b}
                  className="bg-green-100 text-green-800 text-xs px-4 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* 방장 */}
          <div className="text-sm text-gray-600 mb-6">
            <div className="font-semibold text-gray-800">방장</div>
            {project.creator}
          </div>

          {/* 참가 버튼 */}
          <div className="flex justify-end">
            <Button
              content={"참가하기"}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenApplyModal(project);
              }}
              color={"blue"}
            />
          </div>
        </div>
      </div>
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
