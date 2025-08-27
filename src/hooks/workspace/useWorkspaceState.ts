// 표준 라이브러리
import { useState, useCallback } from "react";

// 내부 타입
import type { KanbanCardProps, TaskStatus } from "@/components/workspace/KanbanCard";

/**
 * 워크스페이스 상태 관리 커스텀 훅
 * 태스크, 뷰, 상세 패널 등 워크스페이스의 전체적인 상태를 관리합니다.
 */
export function useWorkspaceState() {
  const [activeView, setActiveView] = useState<"kanban" | "calendar" | "documents">("kanban");
  const [selectedTask, setSelectedTask] = useState<KanbanCardProps | null>(null);
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState<TaskStatus>("todo");
  
  const handleTaskSelect = useCallback((task: KanbanCardProps) => {
    setSelectedTask(task);
    setIsNewTask(false);
    setIsDetailExpanded(false);
  }, []);

  const handleNewTask = useCallback((columnId: TaskStatus) => {
    setNewTaskColumn(columnId);
    setIsNewTask(true);
    setSelectedTask(null);
    setIsDetailExpanded(false);
  }, []);

  const handleCloseTaskDetail = useCallback(() => {
    setSelectedTask(null);
    setIsNewTask(false);
    setIsDetailExpanded(false);
  }, []);

  const handleExpandDetail = useCallback(() => {
    setIsDetailExpanded(prev => !prev);
  }, []);

  const handleViewChange = useCallback((view: "kanban" | "calendar" | "documents") => {
    setActiveView(view);
  }, []);

  return {
    // State
    activeView,
    selectedTask,
    isDetailExpanded,
    isNewTask,
    newTaskColumn,
    
    // Computed
    isShowDetail: selectedTask !== null || isNewTask,
    
    // Handlers
    handleTaskSelect,
    handleNewTask,
    handleCloseTaskDetail,
    handleExpandDetail,
    handleViewChange,
  };
}