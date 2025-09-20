import { useState, useEffect, useCallback } from "react";
import {
  getTasks,
  getTaskDetail,
  updateOrderAndStatus,
  deleteTask,
  createTask,
  updateTask,
} from "@/apis/workspace/kanban";
import type {
  TaskListResponse,
  ColumnResponse,
  TaskDetailResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
} from "@/apis/workspace/kanban/types";
import type {
  KanbanCardProps,
  TaskStatus,
} from "@/components/workspace/KanbanCard";
import { useUserStore } from "@/store/userStore";

// API 데이터를 프론트엔드 타입으로 변환
const mapTaskToKanbanCard = (
  task: TaskListResponse,
  columns: ColumnResponse[]
): KanbanCardProps => {
  const status = getStatusFromColumnId(task.columnId, columns);

  return {
    id: task.taskId.toString(),
    title: task.subject,
    description: "",
    priority: task.importance ? "high" : "medium",
    status,
    assignee: { name: "User" },
    dueDate: task.endDate,
    startDate: task.startDate,
    onClick: () => {},
  };
};

// 컬럼 ID를 상태로 변환
const getStatusFromColumnId = (
  columnId: number,
  columns: ColumnResponse[]
): TaskStatus => {
  const column = columns.find((col) => col.columnId === columnId);
  if (!column) return "todo";

  // 컬럼 이름 기반으로 상태 결정 (실제 구현에서는 서버와 협의 필요)
  const name = column.name.toLowerCase();
  if (name.includes("progress") || name.includes("진행")) return "inprogress";
  if (name.includes("done") || name.includes("완료")) return "done";
  return "todo";
};

// 상태를 컬럼 ID로 변환
const getColumnIdFromStatus = (
  status: TaskStatus,
  columns: ColumnResponse[]
): number => {
  const statusMap: Record<TaskStatus, string[]> = {
    todo: ["todo", "할일", "대기"],
    inprogress: ["progress", "진행", "처리"],
    done: ["done", "완료", "끝"],
  };

  const targetKeywords = statusMap[status];
  const column = columns.find((col) =>
    targetKeywords.some((keyword) => col.name.toLowerCase().includes(keyword))
  );

  return column?.columnId || 1;
};

// Task validation 함수
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
 * 칸반 API 연동 훅
 */
export function useKanbanAPI(kanbanId?: number) {
  const { userId } = useUserStore();
  const [tasks, setTasks] = useState<Record<string, KanbanCardProps[]>>({
    todo: [],
    inprogress: [],
    done: [],
  });
  const [columns, setColumns] = useState<ColumnResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 초기 데이터 로드
  const loadInitialData = useCallback(async () => {
    if (!kanbanId || kanbanId === 0) {
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("???wlsdlq");
      const [tasksResponse] = await Promise.all([
        getTasks({ kanbanId }),
        // getColumns(kanbanId),
      ]);

      console.log("...tasksResponse", tasksResponse);

      // if (tasksResponse.success && columnsResponse.success) {
      if (tasksResponse.success) {
        const columnsResponse = [
          {
            columnId: 1,
            name: "할 일",
            sort: 1,
          },
          {
            columnId: 2,
            name: "진행 중",
            sort: 2,
          },
          {
            columnId: 3,
            name: "완료",
            sort: 3,
          },
        ];
        setColumns([
          {
            columnId: 1,
            name: "할 일",
            sort: 1,
          },
          {
            columnId: 2,
            name: "진행 중",
            sort: 2,
          },
          {
            columnId: 3,
            name: "완료",
            sort: 3,
          },
        ]);

        // 태스크를 상태별로 그룹화
        const groupedTasks: Record<string, KanbanCardProps[]> = {
          todo: [],
          inprogress: [],
          done: [],
        };

        tasksResponse.data.forEach((task) => {
          const kanbanCard = mapTaskToKanbanCard(task, columnsResponse);
          groupedTasks[kanbanCard.status].push(kanbanCard);
        });

        setTasks(groupedTasks);
      } else {
        setError(tasksResponse.error || "데이터 로드 실패");
      }
    } catch (err) {
      setError("데이터 로드 중 오류가 발생했습니다.");
      console.error("Load data error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [kanbanId]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // 태스크 이동 및 상태 변경
  const handleTaskMove = useCallback(
    async (taskId: string, newStatus: TaskStatus) => {
      // 이전 상태 백업
      const previousTasks = { ...tasks };

      // 낙관적 업데이트
      setTasks((prev) => {
        const newTasks = { ...prev };
        let taskToMove: KanbanCardProps | null = null;

        // 기존 위치에서 태스크 제거
        Object.keys(newTasks).forEach((status) => {
          const taskIndex = newTasks[status].findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            taskToMove = { ...newTasks[status][taskIndex], status: newStatus };
            newTasks[status].splice(taskIndex, 1);
          }
        });

        // 새 위치에 태스크 추가
        if (taskToMove) {
          newTasks[newStatus].push(taskToMove);
        }

        return newTasks;
      });

      try {
        const taskIdNumber = parseInt(taskId);

        const response = await updateOrderAndStatus(taskIdNumber, {
          taskId: taskIdNumber,
          sort: 0,
        });

        if (!response.success) {
          // 실패 시 이전 상태로 롤백
          setTasks(previousTasks);
          throw new Error(response.error || "태스크 이동 실패");
        }
      } catch (err) {
        // 에러 발생 시 이전 상태로 롤백
        setTasks(previousTasks);
        console.error("Task move error:", err);
        setError("태스크 이동 중 오류가 발생했습니다.");
      }
    },
    [tasks]
  );

  // 태스크 상세 정보 가져오기
  const getTaskDetailById = useCallback(
    async (taskId: string): Promise<TaskDetailResponse | null> => {
      if (!kanbanId) return null;

      try {
        const response = await getTaskDetail(parseInt(taskId), { kanbanId });
        return response.success ? response.data : null;
      } catch (err) {
        console.error("Get task detail error:", err);
        return null;
      }
    },
    [kanbanId]
  );

  // 태스크 삭제
  const handleTaskDelete = useCallback(
    async (taskId: string): Promise<boolean> => {
      if (!kanbanId) return false;

      try {
        const response = await deleteTask(parseInt(taskId), { kanbanId });

        if (response.success) {
          // 로컬 상태에서 태스크 제거
          setTasks((prev) => {
            const newTasks = { ...prev };
            Object.keys(newTasks).forEach((status) => {
              newTasks[status] = newTasks[status].filter(
                (t) => t.id !== taskId
              );
            });
            return newTasks;
          });
          return true;
        } else {
          throw new Error(response.error || "태스크 삭제 실패");
        }
      } catch (err) {
        console.error("Task delete error:", err);
        setError("태스크 삭제 중 오류가 발생했습니다.");
        return false;
      }
    },
    [kanbanId]
  );

  // 태스크 생성
  const handleTaskCreate = useCallback(
    async (task: KanbanCardProps): Promise<boolean> => {
      if (!kanbanId) {
        setError("칸반 ID가 없습니다.");
        return false;
      }

      if (!userId) {
        setError("로그인이 필요합니다.");
        return false;
      }

      // Validation 수행
      const validation = validateTask(task);
      if (!validation.isValid) {
        setError(validation.errors.join(" "));
        return false;
      }

      try {
        const columnId = getColumnIdFromStatus(task.status, columns);

        const createRequest: CreateTaskRequest = {
          subject: task.title.trim(),
          content: task.description?.trim() || "",
          userId,
          kanbanId,
          columnId,
          users: [userId], // 현재 사용자를 담당자로 설정
          startDate: task.startDate || new Date().toISOString().split("T")[0],
          endDate: task.dueDate || "",
          importance: task.priority === "high" ? "Y" : "N",
          sort: tasks[task.status].length + 1,
        };

        const response = await createTask(createRequest);

        if (response.success) {
          // 성공 시 에러 상태 클리어
          setError(null);
          // 데이터 새로고침
          await loadInitialData();
          return true;
        } else {
          throw new Error(response.error || "태스크 생성 실패");
        }
      } catch (err) {
        console.error("Task create error:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "태스크 생성 중 오류가 발생했습니다.";
        setError(errorMessage);
        return false;
      }
    },
    [kanbanId, userId, columns, tasks, loadInitialData]
  );

  // 태스크 업데이트
  const handleTaskUpdate = useCallback(
    async (task: KanbanCardProps): Promise<boolean> => {
      if (!kanbanId) return false;

      try {
        const columnId = getColumnIdFromStatus(task.status, columns);

        const updateRequest: UpdateTaskRequest = {
          taskId: parseInt(task.id),
          kanbanId,
          columnId,
          subject: task.title,
          users: [1], // 실제로는 담당자 ID 배열
          content: task.description || "",
          name: task.assignee.name,
          startDate: task.startDate || new Date().toISOString().split("T")[0],
          endDate: task.dueDate,
          importance: task.priority === "high" ? "Y" : "N",
        };

        const response = await updateTask(parseInt(task.id), updateRequest);

        if (response.success) {
          // 로컬 상태 업데이트
          setTasks((prev) => {
            const newTasks = { ...prev };
            Object.keys(newTasks).forEach((status) => {
              const taskIndex = newTasks[status].findIndex(
                (t) => t.id === task.id
              );
              if (taskIndex !== -1) {
                newTasks[status][taskIndex] = task;
              }
            });
            return newTasks;
          });
          return true;
        } else {
          throw new Error(response.error || "태스크 업데이트 실패");
        }
      } catch (err) {
        console.error("Task update error:", err);
        setError("태스크 업데이트 중 오류가 발생했습니다.");
        return false;
      }
    },
    [kanbanId, columns]
  );

  return {
    tasks,
    columns,
    isLoading,
    error,
    loadInitialData,
    handleTaskMove,
    getTaskDetailById,
    handleTaskDelete,
    handleTaskCreate,
    handleTaskUpdate,
  };
}
