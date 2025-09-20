import type { ReactNode } from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: ReactNode;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

export const Select = ({ value, onValueChange, children, className = "" }: SelectProps) => {
  return (
    <div className={`relative ${className}`}>
      <select 
        value={value} 
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export const SelectTrigger = ({ children, className = "" }: SelectTriggerProps) => children;

export const SelectContent = ({ children }: SelectContentProps) => children;

export const SelectValue = () => null;

export const SelectItem = ({ value, children }: SelectItemProps) => (
  <option value={value}>{children}</option>
);