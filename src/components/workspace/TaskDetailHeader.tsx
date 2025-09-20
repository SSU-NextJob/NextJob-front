import { Button } from "../atoms/Button";

interface TaskDetailHeaderProps {
  isNewTask: boolean;
  isExpanded: boolean;
  isEditing: boolean;
  onExpand: () => void;
  onClose: () => void;
  onSave: () => void;
  onEdit: () => void;
  onDelete?: () => void;
}

export function TaskDetailHeader({
  isNewTask,
  isExpanded,
  isEditing,
  onExpand,
  onClose,
  onSave,
  onEdit,
  onDelete
}: TaskDetailHeaderProps) {
  return (
    <header className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onExpand}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label={isExpanded ? "축소" : "확장"}
          >
            <span className="text-sm text-gray-700 hover:text-gray-900">
              {isExpanded ? "⤡" : "⤢"}
            </span>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {isNewTask ? "새 태스크" : "태스크 상세"}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="닫기"
        >
          <span className="text-lg text-gray-700 hover:text-gray-900">×</span>
        </button>
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <Button color="blue" onClick={onSave}>
            💾 저장
          </Button>
        ) : (
          <>
            <Button color="white" onClick={onEdit}>
              ✏️ 편집
            </Button>
            {!isNewTask && onDelete && (
              <Button color="red" onClick={onDelete}>
                🗑️ 삭제
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
}