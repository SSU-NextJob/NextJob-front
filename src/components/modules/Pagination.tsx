import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
}) => {
  if (totalPages <= 1) return null;

  // 5개 단위로 페이지 그룹 계산
  const groupSize = 5;
  const currentGroup = Math.floor((page - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  const handlePrevGroup = () => {
    if (startPage > 1) onChange(startPage - 1);
  };
  const handleNextGroup = () => {
    if (endPage < totalPages) onChange(endPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 select-none">
      <button
        className="px-2 py-1 text-gray-500 disabled:text-gray-300"
        onClick={handlePrevGroup}
        disabled={startPage === 1}
      >
        이전
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNum = startPage + i;
        return (
          <button
            key={pageNum}
            className={`px-3 py-1 rounded-md border ${pageNum === page ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
            onClick={() => onChange(pageNum)}
            disabled={pageNum === page}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        className="px-2 py-1 text-gray-500 disabled:text-gray-300"
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};
