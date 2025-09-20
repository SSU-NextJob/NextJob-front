import { useState } from "react";
import type { KanbanCardProps } from "./KanbanCard";
import { TaskDetailHeader } from "./TaskDetailHeader";
import { TaskForm } from "./TaskForm";
import { CONTAINER_STYLES } from "./constants";

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
  onStatusChange: (
    taskId: string,
    newStatus: "todo" | "inprogress" | "done"
  ) => void;
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
  onStatusChange,
}: TaskDetailProps) {
  const [isEditing, setIsEditing] = useState(isNewTask);
  const [editedTask, setEditedTask] = useState<KanbanCardProps>(
    task || {
      id: '',
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
      assignee: { name: '' },
      dueDate: '',
      startDate: '',
      onClick: () => {}
    }
  );

  if (!task && !isNewTask) return null;

  const currentTask = task || editedTask;

  const handleSave = () => {
    if (editedTask.title.trim()) {
      const taskToSave = {
        ...editedTask,
        id: editedTask.id || Date.now().toString()
      };
      onSave(taskToSave);
      setIsEditing(false);
      if (isNewTask) {
        onClose();
      }
    }
  };

  const handleStatusChange = (newStatus: "todo" | "inprogress" | "done") => {
    if (task) {
      onStatusChange(task.id, newStatus);
      setEditedTask(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(currentTask);
  };

  return (
    <div
      className={`${isExpanded ? CONTAINER_STYLES.expanded : CONTAINER_STYLES.collapsed} h-full flex flex-col`}
    >
      <TaskDetailHeader
        isNewTask={isNewTask}
        isExpanded={isExpanded}
        isEditing={isEditing}
        onExpand={onExpand}
        onClose={onClose}
        onSave={handleSave}
        onEdit={handleEdit}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        <TaskForm
          task={isEditing ? editedTask : currentTask}
          isEditing={isEditing}
          onTaskChange={setEditedTask}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}
