import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { Select, SelectItem } from "../atoms/Select";
import { Separator } from "../atoms/Separator";
import { FORM_FIELD_WIDTHS, PRIORITY_COLORS, PRIORITY_LABELS } from "./constants";
import type { KanbanCardProps } from "./KanbanCard";

interface TaskFormProps {
  task: KanbanCardProps;
  isEditing: boolean;
  onTaskChange: (task: KanbanCardProps) => void;
  onStatusChange?: (newStatus: "todo" | "inprogress" | "done") => void;
}


export function TaskForm({ task, isEditing, onTaskChange, onStatusChange }: TaskFormProps) {
  const updateTask = <K extends keyof KanbanCardProps>(
    field: K, 
    value: KanbanCardProps[K]
  ) => {
    onTaskChange({ ...task, [field]: value });
  };

  const updateAssignee = (name: string) => {
    onTaskChange({ ...task, assignee: { ...task.assignee, name } });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* 제목 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">제목</label>
        {isEditing ? (
          <Input
            value={task.title}
            onChange={(e) => updateTask("title", e.target.value)}
            placeholder="태스크 제목을 입력하세요..."
            className="text-xl font-semibold"
          />
        ) : (
          <h3 className="text-xl font-semibold text-gray-900">{task.title || "제목 없음"}</h3>
        )}
      </div>

      <Separator />

      {/* 상태 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">상태</label>
        {isEditing ? (
          <Select
            value={task.status}
            onValueChange={(value) => updateTask("status", value as "todo" | "inprogress" | "done")}
            className={FORM_FIELD_WIDTHS.select}
          >
            <SelectItem value="todo">할 일</SelectItem>
            <SelectItem value="inprogress">진행 중</SelectItem>
            <SelectItem value="done">완료</SelectItem>
          </Select>
        ) : (
          <Select 
            value={task.status} 
            onValueChange={(value) => onStatusChange?.(value as "todo" | "inprogress" | "done")}
            className={FORM_FIELD_WIDTHS.select}
          >
            <SelectItem value="todo">할 일</SelectItem>
            <SelectItem value="inprogress">진행 중</SelectItem>
            <SelectItem value="done">완료</SelectItem>
          </Select>
        )}
      </div>

      <Separator />

      {/* 우선순위 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">우선순위</label>
        {isEditing ? (
          <Select
            value={task.priority}
            onValueChange={(value) => updateTask("priority", value as "high" | "medium" | "low")}
            className={FORM_FIELD_WIDTHS.select}
          >
            <SelectItem value="high">높음</SelectItem>
            <SelectItem value="medium">보통</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </Select>
        ) : (
          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${PRIORITY_COLORS[task.priority]}`}
          >
            {PRIORITY_LABELS[task.priority]} 우선순위
          </span>
        )}
      </div>

      <Separator />

      {/* 담당자 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-3">담당자</label>
        {isEditing ? (
          <Input
            value={task.assignee.name}
            onChange={(e) => updateAssignee(e.target.value)}
            placeholder="담당자 이름..."
          />
        ) : (
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
              {task.assignee.name
                ? task.assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()
                : '?'
              }
            </div>
            <div>
              <p className="font-medium text-gray-900">{task.assignee.name || "배정되지 않음"}</p>
              <p className="text-sm text-gray-500">담당자</p>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* 날짜 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">시작일</label>
          {isEditing ? (
            <Input
              type="date"
              value={task.startDate}
              onChange={(e) => updateTask("startDate", e.target.value)}
            />
          ) : (
            <div className="flex items-center space-x-2 text-gray-600">
              <span>📅</span>
              <span>{task.startDate || "설정되지 않음"}</span>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">마감일</label>
          {isEditing ? (
            <Input
              type="date"
              value={task.dueDate}
              onChange={(e) => updateTask("dueDate", e.target.value)}
            />
          ) : (
            <div className="flex items-center space-x-2 text-gray-600">
              <span>📅</span>
              <span>{task.dueDate || "설정되지 않음"}</span>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* 설명 */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-3">설명</label>
        {isEditing ? (
          <Textarea
            value={task.description || ""}
            onChange={(e) => updateTask("description", e.target.value)}
            placeholder="설명을 추가하세요..."
            className="min-h-[120px] resize-none"
          />
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 min-h-[120px]">
            {task.description ? (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{task.description}</p>
            ) : (
              <p className="text-gray-400 italic">설명이 제공되지 않았습니다</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}