interface SeparatorProps {
  className?: string;
}

export const Separator = ({ className = "" }: SeparatorProps) => {
  const baseClass = "border-t border-gray-200";
  
  return <hr className={`${baseClass} ${className}`} />;
};