/**
 * TaskDetail 컴포넌트에서 사용하는 상수들
 */

export const FORM_FIELD_WIDTHS = {
  select: "w-40",
  input: "w-full"
} as const;

export const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-orange-100 text-orange-800 border-orange-200",
  low: "bg-green-100 text-green-800 border-green-200",
} as const;

export const STATUS_LABELS = {
  todo: "할 일",
  inprogress: "진행 중", 
  done: "완료"
} as const;

export const PRIORITY_LABELS = {
  high: "높음",
  medium: "보통",
  low: "낮음"
} as const;

export const CONTAINER_STYLES = {
  expanded: "fixed inset-0 z-50 bg-white",
  collapsed: "w-[480px] border-l border-gray-200"
} as const;