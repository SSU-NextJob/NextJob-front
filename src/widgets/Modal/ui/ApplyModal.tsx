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
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:cursor-pointer focus:outline-none focus:ring-0 active:ring-0"
          >
            &times;
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-center">
          이 프로잭트에 지원하시겠습니까?
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-sm px-4 py-1.5 rounded-md transition border text-gray-800 bg-gray-100 hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={onApply}
            className="text-sm px-4 py-1.5 rounded-md transition bg-gray-900 text-white hover:bg-black"
          >
            지원하기
          </button>
        </div>
      </div>
    </div>
  );
};
