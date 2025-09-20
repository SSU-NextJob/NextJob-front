import { useState, useEffect } from "react";
import type { KanbanCardProps } from "./KanbanCard";
import { TaskDetailHeader } from "./TaskDetailHeader";
import { TaskForm } from "./TaskForm";
import { CONTAINER_STYLES } from "./constants";
import { useUserStore } from "@/store/userStore";
import type { TaskDetailResponse } from "@/apis/workspace/kanban/types";

// Task validation 함수 (useKanbanAPI와 동일한 로직)
const validateTask = (
  task: KanbanCardProps
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!task.title || task.title.trim() === "") {
    errors.push("제목은 필수 입력 항목입니다.");
  }

  if (task.title && task.title.length > 100) {
    errors.push("제목은 100자 이하로 입력해주세요.");
  }

  if (task.description && task.description.length > 1000) {
    errors.push("설명은 1000자 이하로 입력해주세요.");
  }

  // if (!task.assignee?.name || task.assignee.name.trim() === '') {
  //   errors.push('담당자는 필수 입력 항목입니다.');
  // }

  if (task.startDate && task.dueDate) {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.dueDate);
    if (startDate > endDate) {
      errors.push("시작일은 마감일보다 이전이어야 합니다.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

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
  onSave: (task: KanbanCardProps) => Promise<void> | void;
  /** 상태 변경 이벤트 핸들러 */
  onStatusChange: (
    taskId: string,
    newStatus: "todo" | "inprogress" | "done"
  ) => void;
  /** 삭제 이벤트 핸들러 */
  onDelete?: (taskId: string) => Promise<boolean>;
  /** 태스크 상세 정보 가져오기 핸들러 */
  getTaskDetail?: (taskId: string) => Promise<TaskDetailResponse | null>;
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
  onDelete,
  getTaskDetail,
}: TaskDetailProps) {
  const { userName } = useUserStore();
  const [isEditing, setIsEditing] = useState(isNewTask);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<KanbanCardProps>(
    task || {
      id: "",
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      assignee: { name: userName || "" }, // 현재 사용자 이름을 기본값으로 설정
      dueDate: "",
      startDate: "",
      onClick: () => {},
    }
  );

  // 태스크 상세 정보 로드
  useEffect(() => {
    const loadTaskDetail = async () => {
      if (!task || isNewTask || !getTaskDetail || !task.id) return;

      setIsLoadingDetail(true);
      setDetailError(null);

      try {
        const detailResponse = await getTaskDetail(task.id);
        console.log("...detailResponse", detailResponse);
        if (detailResponse) {
          // API 응답을 UI에서 사용하는 형태로 변환
          const updatedTask: KanbanCardProps = {
            ...task,
            title: detailResponse.subject || task.title,
            description: detailResponse.content || task.description || "",
            priority: detailResponse.importance ? "high" : "medium",
            dueDate: detailResponse.endDate || task.dueDate,
            startDate: detailResponse.startDate || task.startDate,
            assignee:
              detailResponse.users?.length > 0
                ? {
                    name: detailResponse.users[0].name,
                    avatar: detailResponse.users[0].profileImage,
                  }
                : task.assignee,
          };
          setEditedTask(updatedTask);
        } else {
          setDetailError("태스크 상세 정보를 불러올 수 없습니다.");
        }
      } catch (error) {
        console.error("Failed to load task detail:", error);
        setDetailError("태스크 상세 정보 로드 중 오류가 발생했습니다.");
      } finally {
        setIsLoadingDetail(false);
      }
    };

    loadTaskDetail();
  }, [task, isNewTask, getTaskDetail]);

  if (!task && !isNewTask) return null;

  const currentTask = editedTask;

  const handleSave = async () => {
    // Validation 수행
    const validation = validateTask(editedTask);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    // Validation 통과 시 에러 상태 클리어
    setValidationErrors([]);

    const taskToSave = {
      ...editedTask,
      id: editedTask.id || Date.now().toString(),
    };

    try {
      await onSave(taskToSave);
      setIsEditing(false);
      // 새 태스크가 아닌 경우에만 자동으로 닫기 (새 태스크는 WorkspacePage에서 처리)
      if (!isNewTask) {
        // 기존 태스크 수정 성공 시 편집 모드 종료
      }
    } catch (error) {
      // 에러는 이미 useKanbanAPI에서 처리되므로 여기서는 추가 처리 안함
      console.error("Save task error:", error);
    }
  };

  const handleStatusChange = (newStatus: "todo" | "inprogress" | "done") => {
    if (task) {
      onStatusChange(task.id, newStatus);
      setEditedTask((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(currentTask);
    setValidationErrors([]); // 편집 모드 진입 시 에러 상태 클리어
  };

  const handleTaskChange = (task: KanbanCardProps) => {
    setEditedTask(task);
    // 입력값 변경 시 에러 상태 클리어
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleDelete = async () => {
    console.log("진입 1");
    console.log("진입 tas", task);
    if (task && onDelete) {
      console.log("진입 2");
      const success = await onDelete(task.id);
      console.log("success??", success);
      if (success) {
        onClose();
      }
    }
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
        onDelete={handleDelete}
      />

      <main className="flex-1 p-6 overflow-y-auto">
        {isLoadingDetail ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-gray-500">
                태스크 상세 정보를 불러오는 중...
              </div>
            </div>
          </div>
        ) : detailError ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-red-600 mb-2">{detailError}</div>
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                다시 시도
              </button>
            </div>
          </div>
        ) : (
          <TaskForm
            task={isEditing ? editedTask : currentTask}
            isEditing={isEditing}
            onTaskChange={handleTaskChange}
            onStatusChange={handleStatusChange}
            errors={isEditing ? validationErrors : []}
          />
        )}
      </main>
    </div>
  );
}
