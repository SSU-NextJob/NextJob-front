import { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    const baseClass =
      "w-full px-3 py-2 border border-gray-400 rounded-md text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 resize-vertical bg-white";

    return (
      <textarea ref={ref} className={`${baseClass} ${className}`} {...props} />
    );
  }
);

Textarea.displayName = "Textarea";
