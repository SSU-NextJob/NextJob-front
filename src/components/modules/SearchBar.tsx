import type { ChangeEvent } from "react";
import type { KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onEnter?: () => void;
}

export const SearchBar = ({
  value,
  className,
  onChange,
  placeholder = "검색",
  onEnter,
}: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };
  return (
    <div className={className}>
      <div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
        </svg> */}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-full bg-white rounded-lg border border-gray-300 py-2 pl-4 pr-4 text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};
