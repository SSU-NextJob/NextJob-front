import React, { useState } from "react";
import { Button } from "@/shared/ui/modules/Button";

interface RecruitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    projectId: string;
    summary: string;
    roles: string[];
  }) => void;
  projectOptions: { id: string; name: string }[];
}

const commonRoles = [
  "프론트엔드 개발자",
  "백엔드 개발자",
  "풀스택 개발자",
  "UI/UX 디자이너",
  "프로덕트 매니저",
  "데이터 사이언티스트",
  "데브옵스 엔지니어",
  "모바일 개발자",
  "QA 엔지니어",
  "마케팅 전문가",
];

export const RecruitTeamModal = ({
  isOpen,
  onClose,
  onSubmit,
  projectOptions,
}: RecruitModalProps) => {
  const [projectId, setProjectId] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = () => {
    if (!projectId || !summary || selectedRoles.length === 0) return;
    onSubmit({ projectId, summary, roles: selectedRoles });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">팀원 모집</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* Project select */}
          <div>
            <label className="text-sm font-medium block mb-1">
              프로젝트 선택
            </label>
            <select
              className="border w-full px-3 py-2 rounded-md text-sm"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">모집할 프로젝트를 선택하세요</option>
              {projectOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="text-sm font-medium block mb-1">모집 요약</label>
            <textarea
              className="border w-full px-3 py-2 rounded-md text-sm"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="팀원들을 끌어들일 멋진 요약을 작성하세요..."
            />
          </div>

          {/* Selected roles preview */}
          {selectedRoles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedRoles.map((role) => (
                <span
                  key={role}
                  className="bg-blue-600 text-white text-sm rounded-full px-3 py-1 flex items-center"
                >
                  {role}
                  <button
                    type="button"
                    onClick={() => handleRoleToggle(role)}
                    className="ml-2 flex items-center justify-center text-white hover:text-gray-200 text-sm p-0 leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Common roles */}
          <div>
            <label className="text-sm font-medium block mb-1">필요 역할</label>
            <div className="text-xs text-gray-500 mb-1">주요 역할:</div>
            <div className="flex flex-wrap gap-2">
              {commonRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleToggle(role)}
                  className={`border rounded-full px-3 py-1 text-sm transition ${
                    selectedRoles.includes(role)
                      ? "bg-blue-600 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {selectedRoles.includes(role) ? "−" : "+"} {role}
                </button>
              ))}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <Button content="취소" onClick={onClose} color="gray" />
            <Button
              content="모집 등록"
              onClick={handleSubmit}
              color="blue"
              disabled={!projectId || !summary || selectedRoles.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
