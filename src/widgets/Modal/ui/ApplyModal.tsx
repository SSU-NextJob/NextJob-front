import { Button } from "@/shared/ui/atoms/Button";
import React from "react";

interface ConfirmApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const ConfirmApplyModal = ({
  isOpen,
  onClose,
  onApply,
}: ConfirmApplyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">프로젝트 지원</h2>
          <Button content={"X"} onClick={onClose} color={"none"} />
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-center">
          이 프로잭트에 지원하시겠습니까?
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button content={"취소"} onClick={onClose} color={"gray"} />
          <Button content={"지원하기"} onClick={onApply} color={"blue"} />
        </div>
      </div>
    </div>
  );
};
