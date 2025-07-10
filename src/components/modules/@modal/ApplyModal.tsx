import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { postProjectApply } from "@/apis/project";

interface ConfirmApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  projectId?: number;
}

export const ConfirmApplyModal = ({
  isOpen,
  onClose,
  onApply,
  projectId,
}: ConfirmApplyModalProps) => {
  const mutation = useMutation({
    mutationFn: () => {
      if (!projectId) throw new Error("프로젝트 ID가 없습니다.");
      return postProjectApply({ projectId, userId: 1 });
    },
    onSuccess: () => {
      alert("지원이 완료되었습니다.");
      onClose();
    },
    onError: (e: any) => {
      alert(e.message || "지원에 실패했습니다.");
    },
  });

  useEffect(() => {
    // 모달이 열릴 때마다 상태 초기화 등 필요시 구현
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">프로젝트 지원</h2>
          <button onClick={onClose}>X</button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-center">
          이 프로젝트에 지원하시겠습니까?
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
            취소
          </button>
          <button
            onClick={() => mutation.mutate()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "지원 중..." : "지원하기"}
          </button>
        </div>
      </div>
    </div>
  );
};
