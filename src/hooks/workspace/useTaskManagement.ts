// 표준 라이브러리
import { useState, useCallback } from "react";

// 내부 타입
import type { KanbanCardProps, TaskStatus } from "@/components/workspace/KanbanCard";

// 초기 태스크 데이터
const INITIAL_TASKS: Record<string, KanbanCardProps[]> = {
  todo: [
    {
      id: "1",
      title: "Research competitive analysis",
      description: "Analyze top 5 competitors and their pricing strategies to understand market positioning and identify opportunities for differentiation.",
      priority: "high",
      status: "todo",
      assignee: { name: "Alice Johnson" },
      dueDate: "2024-08-25",
      startDate: "2024-08-20",
      onClick: () => {}
    },
    {
      id: "2",
      title: "Design system documentation",
      description: "Create comprehensive documentation for the design system components including usage guidelines, code examples, and best practices.",
      priority: "medium",
      status: "todo",
      assignee: { name: "Bob Smith" },
      dueDate: "2024-08-28",
      startDate: "2024-08-22",
      onClick: () => {}
    },
  ],
  inprogress: [
    {
      id: "4",
      title: "Homepage redesign",
      description: "Redesign the homepage with new branding guidelines, improved user flow, and better conversion optimization.",
      priority: "high",
      status: "inprogress",
      assignee: { name: "David Wilson" },
      dueDate: "2024-08-22",
      startDate: "2024-08-15",
      onClick: () => {}
    },
  ],
  done: [
    {
      id: "6",
      title: "Brand guidelines update",
      description: "Updated comprehensive brand guidelines including new color palette, typography system, and logo usage guidelines.",
      priority: "medium",
      status: "done",
      assignee: { name: "Frank Miller" },
      dueDate: "2024-08-15",
      startDate: "2024-08-10",
      onClick: () => {}
    },
  ]
};

/**
 * 태스크 관리 커스텀 훅
 * 태스크의 생성, 수정, 이동 등의 비즈니스 로직을 관리합니다.
 */
export function useTaskManagement(_workspaceId: string = "demo", _isOnlineMode: boolean = false) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleTaskSave = useCallback(async (task: KanbanCardProps, isNewTask: boolean, newTaskColumn: string) => {
    const targetColumn = isNewTask ? newTaskColumn : task.status;
    
    setTasks(prev => {
      const newTasks = { ...prev };
      
      if (isNewTask) {
        newTasks[targetColumn] = [...(newTasks[targetColumn] || []), task];
      } else {
        Object.keys(newTasks).forEach(columnId => {
          newTasks[columnId] = newTasks[columnId].map(t => 
            t.id === task.id ? task : t
          );
        });
      }
      
      return newTasks;
    });
  }, []);

  const handleTaskMove = useCallback(async (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      let taskToMove: KanbanCardProps | null = null;
      
      Object.keys(newTasks).forEach(columnId => {
        const taskIndex = newTasks[columnId].findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          taskToMove = { ...newTasks[columnId][taskIndex], status: newStatus };
          newTasks[columnId] = newTasks[columnId].filter(t => t.id !== taskId);
        }
      });
      
      if (taskToMove) {
        newTasks[newStatus] = [...(newTasks[newStatus] || []), taskToMove];
      }
      
      return newTasks;
    });
  }, []);

  const handleStatusChange = useCallback((taskId: string, newStatus: TaskStatus) => {
    handleTaskMove(taskId, newStatus);
  }, [handleTaskMove]);

  return {
    tasks,
    isLoading: false,
    error: null,
    handleTaskSave,
    handleTaskMove,
    handleStatusChange,
  };
}