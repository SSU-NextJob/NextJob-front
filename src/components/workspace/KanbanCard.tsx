// 서드파티 라이브러리
import { useDrag, useDrop } from "react-dnd";
import { Calendar, User, GripVertical } from "lucide-react";
import { useRef } from "react";

// 내부 UI 컴포넌트
import { Card, CardContent } from "@/components/atoms/Card";
import { WorkspaceBadge } from "./WorkspaceBadge";
import { Avatar, AvatarFallback } from "@/components/atoms/Avatar";

// 우선순위 타입 정의
export type TaskPriority = "high" | "medium" | "low";

// 태스크 상태 타입 정의
export type TaskStatus = "todo" | "inprogress" | "done";

// 담당자 정보 타입
export interface TaskAssignee {
  /** 담당자 이름 */
  name: string;
  /** 담당자 아바타 URL (선택사항) */
  avatar?: string;
}

/**
 * 칸반 카드 컴포넌트의 Props 타입
 */
export interface KanbanCardProps {
  /** 태스크 고유 ID */
  id: string;
  /** 태스크 제목 */
  title: string;
  /** 태스크 설명 (선택사항) */
  description?: string;
  /** 태스크 우선순위 */
  priority: TaskPriority;
  /** 태스크 상태 */
  status: TaskStatus;
  /** 태스크 담당자 */
  assignee: TaskAssignee;
  /** 마감일 (YYYY-MM-DD 형식) */
  dueDate: string;
  /** 시작일 (YYYY-MM-DD 형식, 선택사항) */
  startDate?: string;
  /** 정렬 순서 */
  sort?: number;
  /** 카드 클릭 이벤트 핸들러 */
  onClick: (task: KanbanCardProps) => void;
  /** 드래그앤드롭 hover 시 UI 변경 핸들러 (선택사항) */
  onHover?: (dragId: string, hoverId: string, targetIndex: number) => void;
  /** 드래그앤드롭 drop 시 API 호출 핸들러 (선택사항) */
  onDrop?: (dragId: string, hoverId: string, targetIndex: number) => void;
  /** 현재 카드의 인덱스 */
  index?: number;
}

/**
 * 칸반 카드 컴포넌트
 * 태스크 정보를 카드 형태로 표시하고 드래그 앤 드롭을 지원합니다.
 */
export function KanbanCard({ 
  id,
  title, 
  description, 
  priority, 
  status,
  assignee, 
  dueDate,
  startDate,
  onClick,
  onHover,
  onDrop,
  index = 0
}: KanbanCardProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id, status, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    hover: (item: { id: string; status: string; index: number }, monitor) => {
      if (!dragRef.current || !onHover) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // 같은 위치면 아무것도 하지 않음
      if (dragIndex === hoverIndex) {
        return;
      }

      // 호버링 영역 계산
      const hoverBoundingRect = dragRef.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      
      if (!clientOffset) {
        return;
      }
      
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // 드래그하는 요소가 아래로 이동하는데 마우스가 아직 중간점 위에 있으면 아무것도 하지 않음
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // 드래그하는 요소가 위로 이동하는데 마우스가 아직 중간점 아래에 있으면 아무것도 하지 않음
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // UI 상태만 변경 (API 호출 없음)
      onHover(item.id, id, hoverIndex);

      // 무한 루프 방지를 위해 인덱스 업데이트
      item.index = hoverIndex;
    },
    drop: (item: { id: string; status: string; index: number }) => {
      // Drop 시에만 API 호출
      if (onDrop) {
        onDrop(item.id, id, index);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  
  drag(drop(dragRef));

  // Badge 색상 맵핑
  const PRIORITY_COLOR_MAP: Record<TaskPriority, "red" | "yellow" | "green"> = {
    high: "red",
    medium: "yellow",
    low: "green",
  } as const;

  const task = {
    id,
    title,
    description,
    priority,
    status,
    assignee,
    dueDate,
    startDate,
    onClick
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(task);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(task);
    }
  };

  return (
    <Card 
      ref={dragRef}
      className={`mb-3 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300 bg-white group ${
        isDragging ? 'opacity-50 rotate-2 shadow-lg' : ''
      }`} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${title}. Priority: ${priority}. Assigned to: ${assignee.name}. Due: ${dueDate}`}
      onKeyDown={handleKeyDown}
    >
      <CardContent className="p-4">
        <div className="space-y-3 text-left">
          {/* Drag Handle & Title */}
          <div className="flex items-start space-x-2">
            <GripVertical 
              className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" 
              aria-hidden="true"
            />
            <h4 className="font-medium text-gray-900 leading-tight flex-1 text-left">{title}</h4>
          </div>

          {/* Priority Badge */}
          <div>
            <WorkspaceBadge 
              variant="outline" 
              size="sm"
              color={PRIORITY_COLOR_MAP[priority]}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </WorkspaceBadge>
          </div>

          {/* Due Date */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={dueDate}>Due {dueDate}</time>
          </div>

          {/* Assignee */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{assignee.name}</span>
            </div>
            
            <Avatar size="md">
              <AvatarFallback className="text-xs bg-blue-50 text-blue-600">
                {assignee.name ? 
                  assignee.name.split(' ').map(n => n[0]).join('').toUpperCase() : 
                  '?'
                }
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}