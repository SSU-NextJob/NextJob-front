import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";
import { AssigneeDropdown } from "../AssigneeDropdown";
import { createSchedule } from "@/apis/schedules";
import { getWorkspaceUsers } from "@/apis/workspace";
import type { WorkspaceUser } from "@/apis/workspace";
import { useUserStore } from "@/store/userStore";

interface ScheduleCreateModalProps {
  selectedDate: string; // YYYY-MM-DD format
  onClose: () => void;
  onSuccess?: () => void;
}

export function ScheduleCreateModal({ selectedDate, onClose, onSuccess }: ScheduleCreateModalProps) {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const { userId } = useUserStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(selectedDate);
  const [endDate, setEndDate] = useState(selectedDate);
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<number[]>([]);
  
  const [workspaceUsers, setWorkspaceUsers] = useState<WorkspaceUser[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const fetchWorkspaceUsers = async () => {
    if (!workspaceId) return;
    
    setIsLoadingUsers(true);
    try {
      const response = await getWorkspaceUsers(workspaceId);
      if (response.success) {
        setWorkspaceUsers(response.data);
      }
    } catch (error) {
      console.error("워크스페이스 사용자 조회 실패:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchWorkspaceUsers();
  }, [workspaceId]);

  const handleSubmit = async () => {
    if (!workspaceId || !userId || !title.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await createSchedule({
        workspaceId: parseInt(workspaceId),
        title: title.trim(),
        content: content.trim(),
        startDate: startDate + " 00:00:00",
        endDate: endDate + " 23:59:59",
        assignees: selectedAssigneeIds,
        userId: userId,
      });

      if (response.success) {
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error("일정 생성 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = title.trim() && startDate && endDate && !isSubmitting;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              새 일정 생성
            </h2>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded hover:bg-gray-100 flex items-center justify-center transition-colors -mt-1 text-black font-bold text-lg"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">제목 *</div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
                placeholder="일정 제목을 입력하세요"
                autoFocus
              />
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">담당자</div>
              {isLoadingUsers ? (
                <div className="text-sm text-gray-500">사용자 목록 로딩 중...</div>
              ) : (
                <AssigneeDropdown
                  users={workspaceUsers}
                  selectedUserIds={selectedAssigneeIds}
                  onUserSelect={setSelectedAssigneeIds}
                  placeholder="담당자를 선택하세요 (선택사항)"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1 text-left">시작일 *</div>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    // 시작일이 종료일보다 늦은 경우 종료일을 시작일로 설정
                    if (e.target.value > endDate) {
                      setEndDate(e.target.value);
                    }
                  }}
                  className="text-sm cursor-pointer"
                />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 text-left">종료일 *</div>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate} // 종료일은 시작일 이후만 선택 가능
                  className="text-sm cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
          <div className="text-xs text-gray-500 mb-2 text-left">내용</div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
            placeholder="일정에 대한 상세 내용을 입력하세요 (선택사항)"
          />
        </div>

        <div className="p-6 flex justify-end gap-2">
          <Button
            color="white"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            color="blue"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {isSubmitting ? "생성 중..." : "일정 생성"}
          </Button>
        </div>
      </div>
    </div>
  );
}