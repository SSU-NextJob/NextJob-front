// 서드파티 라이브러리
import { useDrop } from "react-dnd";
import { Plus } from "lucide-react";
import { useRef, useMemo } from "react";

// 내부 모듈
import { KanbanCard } from "./KanbanCard";
import type { KanbanCardProps, TaskStatus } from "./KanbanCard";
import { Button } from "@/components/atoms/Button";

/**
 * 칸반 보드 컴포넌트의 Props 타입
 */
interface KanbanBoardProps {
  /** 태스크 선택 핸들러 */
  onTaskSelect: (task: KanbanCardProps) => void;
  /** 새 태스크 생성 핸들러 */
  onNewTask: (columnId: TaskStatus) => void;
  /** 칸반 태스크 데이터 */
  tasks: Record<string, KanbanCardProps[]>;
  /** 태스크 이동 핸들러 */
  onTaskMove: (
    taskId: string,
    newStatus: TaskStatus,
    targetIndex?: number
  ) => void;
}

/**
 * 칸반 컬럼 컴포넌트의 Props 타입
 */
interface ColumnProps {
  /** 컬럼 ID */
  id: TaskStatus;
  /** 컬럼 제목 */
  title: string;
  /** 컬럼에 속한 태스크 목록 */
  tasks: KanbanCardProps[];
  /** 헤더 색상 클래스 */
  headerColor: string;
  /** 제목 색상 클래스 */
  titleColor: string;
  /** 태스크 선택 핸들러 */
  onTaskSelect: (task: KanbanCardProps) => void;
  /** 새 태스크 생성 핸들러 */
  onNewTask: (columnId: TaskStatus) => void;
  /** 태스크 이동 핸들러 */
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
}

function KanbanColumn({
  id,
  title,
  tasks,
  headerColor,
  titleColor,
  onTaskSelect,
  onNewTask,
  onTaskMove,
}: ColumnProps) {
  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string; status: string }) => {
      if (item.status !== id) {
        onTaskMove(item.id, id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(dropRef);

  return (
    <section
      className="flex-shrink-0 w-80"
      aria-labelledby={`column-${id}-title`}
    >
      <div
        ref={dropRef}
        className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${isOver ? "ring-2 ring-blue-200" : ""} transition-all`}
      >
        <header className={`p-4 ${headerColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3
                className={`font-semibold ${titleColor}`}
                id={`column-${id}-title`}
              >
                {title}
              </h3>
              <span
                className="bg-white/80 text-gray-600 text-xs px-2 py-1 rounded-full font-medium"
                aria-label={`${tasks.length} tasks`}
              >
                {tasks.length}
              </span>
            </div>
            <Button
              onClick={() => onNewTask(id)}
              aria-label={`Add new task to ${title} column`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main
          className="p-4 space-y-3 min-h-[500px] bg-gray-50/50"
          role="list"
          aria-labelledby={`column-${id}-title`}
        >
          {tasks.map((task) => (
            <div key={task.id} role="listitem">
              <KanbanCard {...task} onClick={onTaskSelect} />
            </div>
          ))}

          <Button
            // className="w-full h-12 border-2 border-dashed border-gray-300 text-gray-500 bg-white hover:border-gray-400"
            onClick={() => onNewTask(id)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add new task
          </Button>
        </main>
      </div>
    </section>
  );
}

// 컬럼 설정을 컴포넌트 외부로 이동하여 불필요한 재생성 방지
const COLUMN_CONFIGS = [
  {
    id: "todo" as TaskStatus,
    title: "To Do",
    headerColor: "bg-red-50 border-t-4 border-t-red-400",
    titleColor: "text-red-700",
  },
  {
    id: "inprogress" as TaskStatus,
    title: "In Progress",
    headerColor: "bg-yellow-50 border-t-4 border-t-yellow-400",
    titleColor: "text-yellow-700",
  },
  {
    id: "done" as TaskStatus,
    title: "Done",
    headerColor: "bg-green-50 border-t-4 border-t-green-400",
    titleColor: "text-green-700",
  },
] as const;

/**
 * 칸반 보드 컴포넌트
 * 태스크를 To Do, In Progress, Done 컬럼으로 관리합니다.
 */
export function KanbanBoard({
  onTaskSelect,
  onNewTask,
  tasks,
  onTaskMove,
}: KanbanBoardProps) {
  // 컬럼 설정과 태스크 데이터를 결합, tasks가 변경될 때만 재계산
  const columnConfigsWithTasks = useMemo(
    () =>
      COLUMN_CONFIGS.map((config) => ({
        ...config,
        tasks: tasks[config.id] || [],
      })),
    [tasks]
  );

  return (
    <div className="flex-1 p-6 overflow-x-auto bg-gray-50">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold mb-2 text-gray-900 text-left">
          칸반보드
        </h1>
        {/* <p className="text-gray-600">Manage your tasks and track progress</p> */}
      </header>

      <div
        className="flex space-x-6 min-w-max"
        role="application"
        aria-label="Kanban board for task management"
      >
        {columnConfigsWithTasks.map((column) => (
          <KanbanColumn
            key={column.id}
            {...column}
            onTaskSelect={onTaskSelect}
            onNewTask={onNewTask}
            onTaskMove={onTaskMove}
          />
        ))}
      </div>
    </div>
  );
}
