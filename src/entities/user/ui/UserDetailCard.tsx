import { Button } from "@/shared/ui/atoms/Button";
import { SuggestModal } from "@/widgets/Modal/ui/SuggestModal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  title: string;
  description: string;
  duration: string;
  role: string;
}

interface UserDetailProps {
  name: string;
  role: string;
  location: string;
  about: string;
  experience: string;
  availability: string;
  skills: string[];
  pastProjects: Project[];
}

export const UserDetailCard = (props: UserDetailProps) => {
  const navigate = useNavigate();
  const {
    name,
    role,
    location,
    about,
    experience,
    availability,
    skills,
    pastProjects,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const handleSuggest = (postId: number) => {
    console.log("제안된 모집글 ID:", postId);
    setModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-800 px-6 py-10">
      {/* 뒤로가기 */}
      <div className="mb-6 flex justify-start">
        <Button
          content={"← 뒤로가기"}
          onClick={() => navigate(-1)}
          color={"white"}
        />
      </div>

      {/* 전체 레이아웃 */}
      <div className="text-left">
        {/* 이름 + 역할 + 위치 */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-600">{role}</p>
            <p className="text-sm text-gray-500">📍 {location}</p>
          </div>
        </div>

        {/* 소개 */}
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-1">소개</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{about}</p>
        </div>

        {/* 경력 및 가능시간 */}
        <div className="mb-6 grid grid-cols-2 gap-4 max-w-md">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">경력</h3>
            <p className="text-sm text-gray-700">{experience}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              가능 시간
            </h3>
            <p className="text-sm text-gray-700">{availability}</p>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            보유 기술
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* 과거 프로젝트 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            참여 프로젝트
          </h3>
          <div className="flex flex-col gap-3">
            {pastProjects.map((project) => (
              <div
                key={project.title}
                className="border rounded-lg p-4 bg-gray-50 relative max-w-2xl"
              >
                <h4 className="text-sm font-bold text-gray-900">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-700 mb-1">
                  {project.description}
                </p>
                <p className="text-xs text-gray-500">🕒 {project.duration}</p>
                <span className="absolute top-4 right-4 border text-xs px-2 py-0.5 rounded-full">
                  {project.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
          <Button
            content={"제안하기"}
            onClick={() => setModalOpen(true)}
            color={"blue"}
          />
        </div>
      </div>

      {/* 제안 모달 */}
      {modalOpen && (
        <SuggestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSuggest}
        />
      )}
    </div>
  );
};
