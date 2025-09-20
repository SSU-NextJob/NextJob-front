// 표준 라이브러리
import type { ReactNode } from "react";

// Avatar 크기 타입
type AvatarSize = "sm" | "md" | "lg" | "xl";

/**
 * Avatar 컴포넌트의 Props 타입
 */
interface AvatarProps {
  /** 아바타 이미지 URL */
  src?: string;
  /** 대체 텍스트 */
  alt?: string;
  /** 크기 */
  size?: AvatarSize;
  /** 추가 CSS 클래스 */
  className?: string;
  /** Fallback 컴포넌트 */
  children?: ReactNode;
}

/**
 * AvatarFallback 컴포넌트의 Props 타입
 */
interface AvatarFallbackProps {
  /** Fallback 내용 */
  children: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * Avatar 컴포넌트
 * 사용자 프로필 이미지를 표시합니다.
 */
export const Avatar = ({
  src,
  alt = "Avatar",
  size = "md",
  className = "",
  children,
}: AvatarProps) => {
  // 크기별 스타일
  const sizeClasses: Record<AvatarSize, string> = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  const baseClass = "inline-block rounded-full overflow-hidden bg-gray-100";
  const sizeClass = sizeClasses[size];
  const finalClassName = `${baseClass} ${sizeClass} ${className}`.trim();

  if (src) {
    return (
      <div className={finalClassName}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return <div className={finalClassName}>{children}</div>;
};

/**
 * AvatarFallback 컴포넌트
 * Avatar 이미지가 없을 때 표시되는 fallback입니다.
 */
export const AvatarFallback = ({
  children,
  className = "",
}: AvatarFallbackProps) => {
  const baseClass =
    "h-full w-full flex items-center justify-center bg-gray-100 text-gray-600 font-medium";
  const finalClassName = `${baseClass} ${className}`.trim();

  return <div className={finalClassName}>{children}</div>;
};
