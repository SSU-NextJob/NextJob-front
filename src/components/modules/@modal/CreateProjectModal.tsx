import { Button } from "@/components/atoms/Button";
import { useUserStore } from "@/store/userStore";
import React, { useState } from "react";
import { uploadImageAPI } from "@/apis/image";

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
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [status, setProjectType] = useState("progress");
  const [type, setType] = useState("contest");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { userId } = useUserStore();

  // 필수값 체크
  const isValid = projectName && userId && startAt && endAt && status && type;

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!isValid) return;

    try {
      let imageUrl = "";

      // 이미지가 선택되었으면 먼저 업로드
      if (image) {
        try {
          const uploadResult = await uploadImageAPI(image, "project");
          if (uploadResult.success) {
            imageUrl = uploadResult.data.imageUrl;
          }
        } catch (error) {
          console.warn("이미지 업로드에 실패했습니다:", error);
          // 이미지 업로드 실패해도 계속 진행
        }
      }

      console.log("onCreate", {
        name: projectName,
        content,
        creatorId: userId,
        startAt,
        endAt,
        status,
        image: imageUrl,
        type,
      });
      onCreate({
        name: projectName,
        content,
        creatorId: userId,
        startAt,
        endAt,
        status,
        image: imageUrl,
        type,
      });
      onClose();
    } catch (e) {
      alert("프로젝트 등록에 실패했습니다.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX = 1024 * 1024; // 1MB
      if (file.size > MAX) {
        alert("이미지 용량은 최대 1MB까지 업로드할 수 있습니다.");
        e.currentTarget.value = "";
        return;
      }
      setImage(file);
      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[480px] p-6 shadow-lg">
        {/* Title + Close */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold" style={{color: "#333"}}>새 프로젝트 등록</h2>
          <Button className="bg-white" onClick={onClose}>
            X
          </Button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-gray-800">
              프로젝트 이름 *
            </label>
            <input
              type="text"
              placeholder="프로젝트명을 입력하세요"
              className="w-full border px-3 py-2 rounded-md text-sm bg-white text-gray-800 placeholder-gray-500"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          {/* 설명 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-gray-800">설명</label>
            <textarea
              placeholder="프로젝트 설명을 입력하세요"
              className="w-full border px-3 py-2 rounded-md text-sm resize-none bg-white text-gray-800 placeholder-gray-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>

          {/* 시작일 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-gray-800">
              시작일 *
            </label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-md text-sm bg-white text-gray-800 placeholder-gray-500 cursor-pointer"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              required
            />
          </div>

          {/* 마감일 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-gray-800">
              마감일 *
            </label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-md text-sm bg-white text-gray-800 placeholder-gray-500 cursor-pointer"
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              onClick={(e) => e.currentTarget.showPicker()}
              required
            />
          </div>

          {/* 프로젝트 진행 방식 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-gray-800">
              진행 방식 *
            </label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm bg-white text-gray-800 placeholder-gray-500"
              value={status}
              onChange={(e) => setProjectType(e.target.value)}
              required
            >
              <option value="progress">진행형</option>
              <option value="complete">완료형</option>
            </select>
          </div>

          {/* 유형 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-gray-800">
              유형 *
            </label>
            <select
              className="w-full border px-3 py-2 rounded-md text-sm bg-white text-gray-800 placeholder-gray-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="CONTEST">공모전</option>
              <option value="HACKATHON">해커톤</option>
              <option value="SIDE">사이드 프로젝트</option>
            </select>
          </div>

          {/* 이미지 */}
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-semibold text-gray-800">
              프로젝트 이미지 (선택)
            </label>
            {previewImage ? (
              <div className="w-full border rounded-md overflow-hidden">
                <img
                  src={previewImage}
                  alt="프로젝트 이미지 미리보기"
                  className="w-full h-32 object-cover"
                />
              </div>
            ) : (
              <label
                htmlFor="imageUpload"
                className="w-full border border-dashed border-gray-300 rounded-md cursor-pointer py-8 flex flex-col items-center justify-center text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
              >
                <svg
                  className="w-6 h-6 mb-1 text-gray-700"
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
            )}

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {previewImage && (
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  선택된 파일: {image?.name}
                </p>
                <button
                  onClick={() => {
                    setImage(null);
                    setPreviewImage(null);
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  제거
                </button>
              </div>
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
