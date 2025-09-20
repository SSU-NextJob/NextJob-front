// 서드파티 라이브러리
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 내부 컴포넌트
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { KanbanBoard } from "@/components/workspace/KanbanBoard";
import { CalendarView } from "@/components/workspace/CalendarView";
import { DocumentsView } from "@/components/workspace/DocumentsView";
import { TaskDetail } from "@/components/workspace/TaskDetail";

// 내부 훅
import { useWorkspaceState } from "@/hooks/workspace/useWorkspaceState";
import { useTaskManagement } from "@/hooks/workspace/useTaskManagement";

/**
 * 워크스페이스 페이지 컴포넌트
 * 프로젝트 관리를 위한 칸반 보드, 캘린더, 문서 등 다양한 뷰를 제공합니다.
 */
export default function WorkspacePage() {
  // 워크스페이스 상태 관리
  const {
    activeView,
    selectedTask,
    isDetailExpanded,
    isNewTask,
    newTaskColumn,
    isShowDetail,
    handleTaskSelect,
    handleNewTask,
    handleCloseTaskDetail,
    handleExpandDetail,
    handleViewChange,
  } = useWorkspaceState();

  // 태스크 관리 (데모용 오프라인 모드)
  const {
    tasks,
    isLoading,
    error,
    handleTaskSave: handleTaskSaveBase,
    handleTaskMove,
    handleStatusChange,
  } = useTaskManagement("demo", false);

  // 태스크 저장 핸들러
  const handleTaskSave = async (task: any) => {
    await handleTaskSaveBase(task, isNewTask, newTaskColumn);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "kanban":
        return (
          <KanbanBoard
            onTaskSelect={handleTaskSelect}
            onNewTask={handleNewTask}
            tasks={tasks}
            onTaskMove={handleTaskMove}
          />
        );
      case "calendar":
        return <CalendarView />;
      case "documents":
        return <DocumentsView />;
      default:
        return (
          <KanbanBoard
            onTaskSelect={handleTaskSelect}
            onNewTask={handleNewTask}
            tasks={tasks}
            onTaskMove={handleTaskMove}
          />
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50">
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-full">
          <WorkspaceSidebar
            activeView={activeView}
            onViewChange={handleViewChange}
          />

          <div className="flex flex-1 overflow-hidden">
            {!isDetailExpanded && (
              <main className="flex-1 overflow-hidden">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-lg text-gray-600">
                      데이터를 불러오는 중...
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-lg text-red-600">
                      데이터 로드 중 오류가 발생했습니다.
                    </div>
                  </div>
                ) : (
                  renderMainContent()
                )}
              </main>
            )}

            {isShowDetail && (
              <TaskDetail
                task={selectedTask}
                isExpanded={isDetailExpanded}
                isNewTask={isNewTask}
                onClose={handleCloseTaskDetail}
                onExpand={handleExpandDetail}
                onSave={handleTaskSave}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
        </div>
      </DndProvider>
    </div>
  );
}
