import { Button } from "@/shared/ui/atoms/Button";
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
  const [content, setContent] = useState("");
  const [creatorId] = useState(1); // 임시 고정
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [projectType, setProjectType] = useState("progress");
  const [type, setType] = useState("contest");
  const [image, setImage] = useState<File | null>(null);

  // 필수값 체크
  const isValid =
    projectName && creatorId && startAt && endAt && projectType && type;

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!isValid) return;
    console.log("onCreate", {
      name: projectName,
      content,
      creatorId,
      startAt,
      endAt,
      projectType,
      image: image ? image.name : "",
      type,
    });
    onCreate({
      name: projectName,
      content,
      creatorId,
      startAt,
      endAt,
      projectType,
      image: image ? image.name : "",
      type,
    });
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
          <Button onClick={onClose}>X</Button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">프로젝트 이름 *</label>
            <input
              type="text"
              placeholder="프로젝트명을 입력하세요"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          {/* 설명 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">설명</label>
            <textarea
              placeholder="프로젝트 설명을 입력하세요"
              className="w-full border px-3 py-2 rounded-md text-sm resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          {/* 시작일 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">시작일 *</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              required
            />
          </div>

          {/* 마감일 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">마감일 *</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              required
            />
          </div>

          {/* 프로젝트 진행 방식 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">진행 방식 *</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
            >
              <option value="progress">진행형</option>
              <option value="complete">완료형</option>
            </select>
          </div>

          {/* 유형 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold">유형 *</label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="contest">공모전</option>
              <option value="hackathon">해커톤</option>
              <option value="personal">개인 프로젝트</option>
            </select>
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
            <Button onClick={onClose} color="white">
              취소
            </Button>
            <Button onClick={handleSubmit} color="blue" disabled={!isValid}>
              생성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
