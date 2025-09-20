// 표준 라이브러리
import type { ReactNode } from "react";

// Badge 색상 타입
type BadgeColor = "gray" | "blue" | "red" | "green" | "yellow" | "purple" | "pink";

// Badge variant 타입
type BadgeVariant = "solid" | "outline";

// Badge 크기 타입
type BadgeSize = "sm" | "md" | "lg";

/**
 * Badge 컴포넌트의 Props 타입
 */
interface WorkspaceBadgeProps {
  /** Badge 내용 */
  children: ReactNode;
  /** Badge 색상 */
  color?: BadgeColor;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge 크기 */
  size?: BadgeSize;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Workspace Badge 컴포넌트
 * 상태나 카테고리를 표시하는 작은 레이블입니다.
 */
export const WorkspaceBadge = ({
  children,
  color = "gray",
  variant = "solid",
  size = "md",
  className = "",
  onClick,
}: WorkspaceBadgeProps) => {
  // 기본 스타일
  const baseClass = "inline-flex items-center font-medium rounded-full transition-colors";
  const clickableClass = onClick ? "cursor-pointer hover:opacity-80" : "";

  // 크기별 스타일
  const sizeClasses: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm",
  };

  // Variant별 색상 스타일
  const getVariantClasses = (color: BadgeColor, variant: BadgeVariant): string => {
    if (variant === "outline") {
      const outlineClasses: Record<BadgeColor, string> = {
        gray: "bg-white border border-gray-200 text-gray-800",
        blue: "bg-blue-50 border border-blue-200 text-blue-800",
        red: "bg-red-50 border border-red-200 text-red-800",
        green: "bg-green-50 border border-green-200 text-green-800",
        yellow: "bg-yellow-50 border border-yellow-200 text-yellow-800",
        purple: "bg-purple-50 border border-purple-200 text-purple-800",
        pink: "bg-pink-50 border border-pink-200 text-pink-800",
      };
      return outlineClasses[color];
    }
    
    // solid variant (default)
    const solidClasses: Record<BadgeColor, string> = {
      gray: "bg-gray-100 text-gray-800",
      blue: "bg-blue-100 text-blue-800",
      red: "bg-red-100 text-red-800",
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      purple: "bg-purple-100 text-purple-800",
      pink: "bg-pink-100 text-pink-800",
    };
    return solidClasses[color];
  };

  const variantClass = getVariantClasses(color, variant);
  const sizeClass = sizeClasses[size];
  
  const finalClassName = `${baseClass} ${sizeClass} ${variantClass} ${clickableClass} ${className}`.trim();

  if (onClick) {
    return (
      <button
        className={finalClassName}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={finalClassName}>
      {children}
    </span>
  );
};