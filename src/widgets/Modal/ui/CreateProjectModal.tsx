import { Button } from "@/shared/ui/modules/Button";
import React, { useState } from "react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export const CreateProjectModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [projectType, setProjectType] = useState("해커톤");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onCreate({ projectName, deadline, projectType, description, image });
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[480px] p-6 shadow-lg">
        {/* Title + Close */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">프로젝트 생성</h2>
          <Button content={"X"} onClick={onClose} color={"none"} />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">프로젝트 이름</label>
            <input
              type="text"
              placeholder="프로젝트명을 입력하세요"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          {/* 마감일 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">마감일</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          {/* 프로젝트 유형 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">프로젝트 유형</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="해커톤">해커톤</option>
              <option value="공모전">공모전</option>
              <option value="개인 프로젝트">개인 프로젝트</option>
            </select>
          </div>

          {/* 설명 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">설명</label>
            <textarea
              placeholder="프로젝트 설명을 입력하세요"
              className="w-full border px-3 py-2 rounded-md text-sm resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* 이미지 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">
              프로젝트 이미지 (선택)
            </label>
            <label
              htmlFor="imageUpload"
              className="w-full border border-dashed border-gray-300 rounded-md cursor-pointer py-8 flex flex-col items-center justify-center text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition"
            >
              <svg
                className="w-6 h-6 mb-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
                />
              </svg>
              Click to upload image
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {image && (
              <p className="text-xs text-gray-500 mt-1">
                선택된 파일: {image.name}
              </p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-2 mt-4">
            <Button content="취소" onClick={onClose} color="white" />
            <Button content="생성하기" onClick={handleSubmit} color="blue" />
          </div>
        </div>
      </div>
    </div>
  );
};
