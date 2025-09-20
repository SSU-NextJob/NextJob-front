// 표준 라이브러리
import { forwardRef } from "react";
import type { ReactNode } from "react";

/**
 * Card 컴포넌트의 Props 타입
 */
interface CardProps {
  /** Card 내용 */
  children: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 접근성을 위한 role 속성 */
  role?: string;
  /** 접근성을 위한 tabIndex */
  tabIndex?: number;
  /** 접근성을 위한 aria-label */
  "aria-label"?: string;
  /** 키보드 이벤트 핸들러 */
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * CardContent 컴포넌트의 Props 타입
 */
interface CardContentProps {
  /** Content 내용 */
  children: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * Card 컴포넌트
 * 컨텐츠를 그룹화하여 표시하는 컨테이너입니다.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", onClick, onKeyDown, ...props }, ref) => {
    const baseClass = "bg-white rounded-lg border border-gray-200 shadow-sm";
    const clickableClass = onClick
      ? "cursor-pointer transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      : "";

    const finalClassName = `${baseClass} ${clickableClass} ${className}`.trim();

    return (
      <div
        ref={ref}
        className={finalClassName}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * CardContent 컴포넌트
 * Card 내부의 콘텐츠 영역입니다.
 */
export const CardContent = ({ children, className = "" }: CardContentProps) => {
  const baseClass = "p-6";
  const finalClassName = `${baseClass} ${className}`.trim();

  return <div className={finalClassName}>{children}</div>;
};
