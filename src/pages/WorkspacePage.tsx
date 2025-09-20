// 서드파티 라이브러리
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSearchParams } from "react-router-dom";

// 내부 컴포넌트
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { KanbanBoard } from "@/components/workspace/KanbanBoard";
import { CalendarView } from "@/components/workspace/CalendarView";
import { DocumentsView } from "@/components/workspace/DocumentsView";
import { TaskDetail } from "@/components/workspace/TaskDetail";

// 내부 훅
import { useWorkspaceState } from "@/hooks/workspace/useWorkspaceState";
import { useKanbanAPI } from "@/hooks/workspace/useKanbanAPI";
import { useWorkspace } from "@/hooks/workspace/useWorkspace";

// 내부 타입
import type { KanbanCardProps } from "@/components/workspace/KanbanCard";

/**
 * 워크스페이스 페이지 컴포넌트
 * 프로젝트 관리를 위한 칸반 보드, 캘린더, 문서 등 다양한 뷰를 제공합니다.
 */
export default function WorkspacePage() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  // 워크스페이스 상세 정보 가져오기
  const { workspaceDetail } = useWorkspace(workspaceId || undefined);

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

  // 칸반 API 연동 (workspaceDetail에서 kanbanId 가져오기)
  const kanbanId = workspaceDetail?.data?.kanban?.kanbanId;
  console.log("workspaceDetail...", workspaceDetail);
  const {
    tasks,
    isLoading: isKanbanLoading,
    error: kanbanError,
    handleTaskMove,
    handleTaskCreate,
    handleTaskUpdate,
    handleTaskDelete,
  } = useKanbanAPI(kanbanId);

  // 태스크 저장 핸들러
  const handleTaskSave = async (task: KanbanCardProps) => {
    let success = false;

    if (isNewTask) {
      const taskWithCorrectStatus = { ...task, status: newTaskColumn };
      success = await handleTaskCreate(taskWithCorrectStatus);
    } else {
      success = await handleTaskUpdate(task);
    }

    // 성공 시에만 태스크 상세 닫기
    if (success && isNewTask) {
      handleCloseTaskDetail();
    }
  };

  // 상태 변경 핸들러
  const handleStatusChange = async (
    taskId: string,
    newStatus: "todo" | "inprogress" | "done"
  ) => {
    await handleTaskMove(taskId, newStatus);
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
                {/* {isKanbanLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-lg text-gray-600">
                      데이터를 불러오는 중...
                    </div>
                  </div>
                ) : kanbanError ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-lg text-red-600 mb-4">
                        칸반 데이터 로드 중 오류가 발생했습니다.
                      </div>
                      <div className="text-sm text-gray-600 bg-red-50 p-4 rounded-lg max-w-md">
                        {kanbanError}
                      </div>
                    </div>
                  </div>
                ) : (
                  renderMainContent()
                )} */}
                {renderMainContent()}
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
                onDelete={handleTaskDelete}
              />
            )}
          </div>
        </div>
      </DndProvider>
    </div>
  );
}
