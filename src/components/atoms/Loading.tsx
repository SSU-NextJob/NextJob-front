import React from "react";

interface LoadingProps {
  message?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * 재사용 가능한 로딩 컴포넌트
 * - TailwindCSS 스타일 적용
 * - 한글 기본 메시지
 * - message 또는 children으로 커스텀 가능
 */
export const Loading: React.FC<LoadingProps> = ({
  message = "로딩 중...",
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-8 ${className}`}
    >
      <svg
        className="animate-spin h-8 w-8 text-blue-500 mb-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <div className="text-gray-700 text-base font-medium">
        {children ? children : message}
      </div>
    </div>
  );
};
