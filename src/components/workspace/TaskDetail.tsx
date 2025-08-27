// 내부 타입
import type { KanbanCardProps } from "./KanbanCard";

/**
 * 태스크 상세 컴포넌트의 Props 타입
 */
interface TaskDetailProps {
  /** 표시할 태스크 (새 태스크인 경우 null) */
  task: KanbanCardProps | null;
  /** 전체 화면 확장 여부 */
  isExpanded: boolean;
  /** 새 태스크 생성 모드 여부 */
  isNewTask: boolean;
  /** 닫기 이벤트 핸들러 */
  onClose: () => void;
  /** 확장/축소 이벤트 핸들러 */
  onExpand: () => void;
  /** 저장 이벤트 핸들러 */
  onSave: (task: KanbanCardProps) => void;
  /** 상태 변경 이벤트 핸들러 */
  onStatusChange: (taskId: string, newStatus: "todo" | "inprogress" | "done") => void;
}

/**
 * 태스크 상세 정보 컴포넌트
 * 태스크의 상세 정보를 표시하고 편집할 수 있는 패널입니다.
 */
export function TaskDetail({ 
  task, 
  isExpanded, 
  isNewTask, 
  onClose, 
  onExpand, 
  onSave,
  onStatusChange 
}: TaskDetailProps) {
  if (!task && !isNewTask) return null;

  return (
    <div className={`${isExpanded ? 'fixed inset-0 z-50 bg-white' : 'w-[480px]'} h-full ${!isExpanded ? 'border-l border-gray-200' : ''} flex flex-col`}>
      {/* Header */}
      <header className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {isNewTask ? 'New Task' : 'Task Details'}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={onExpand}
              className="p-2 hover:bg-gray-100 rounded-md"
              aria-label={isExpanded ? "Minimize" : "Expand"}
            >
              {isExpanded ? "↙" : "↗"}
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Task Detail Panel</h3>
          <p className="text-gray-600">
            {task ? `Selected task: ${task.title}` : "Creating new task"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            태스크 상세 편집 기능은 곧 추가될 예정입니다.
          </p>
        </div>
      </main>
    </div>
  );
}