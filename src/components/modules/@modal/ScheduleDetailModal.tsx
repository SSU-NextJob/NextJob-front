import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";
import { AssigneeDropdown } from "../AssigneeDropdown";
import {
  getScheduleDetail,
  updateSchedule,
  deleteSchedule,
  type ScheduleDetail,
} from "@/apis/schedules";
import { getWorkspaceUsers } from "@/apis/workspace";
import type { WorkspaceUser } from "@/apis/workspace";

interface ScheduleDetailModalProps {
  scheduleId: number;
  onClose: () => void;
  onUpdate?: () => void;
}

export function ScheduleDetailModal({
  scheduleId,
  onClose,
  onUpdate,
}: ScheduleDetailModalProps) {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState<ScheduleDetail | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [workspaceUsers, setWorkspaceUsers] = useState<WorkspaceUser[]>([]);
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<number[]>([]);

  const startDateInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);

  const fetchWorkspaceUsers = useCallback(async () => {
    if (!workspaceId) return;

    try {
      const response = await getWorkspaceUsers(workspaceId);
      if (response.success) {
        setWorkspaceUsers(response.data);
      }
    } catch (error) {
      console.error("워크스페이스 사용자 조회 실패:", error);
    }
  }, [workspaceId]);

  const fetchScheduleDetailCallback = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getScheduleDetail(scheduleId);
      if (response.success) {
        setScheduleDetail(response.data);
        setEditedSchedule(response.data);
        setSelectedAssigneeIds(response.data.assignees.map((a) => a.userId));
      }
    } catch (error) {
      console.error("일정 상세 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [scheduleId]);

  useEffect(() => {
    fetchScheduleDetailCallback();
    fetchWorkspaceUsers();
  }, [fetchScheduleDetailCallback, fetchWorkspaceUsers]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "설정되지 않음";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!scheduleDetail) {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center text-red-500">
            일정을 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

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
            {isEditing ? (
              <Input
                value={editedSchedule?.title || ""}
                onChange={(e) =>
                  setEditedSchedule((prev) =>
                    prev ? { ...prev, title: e.target.value } : null
                  )
                }
                className="text-2xl font-semibold border-none p-0 focus:ring-0"
                placeholder="제목 없음"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-900">
                {scheduleDetail.title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="h-8 w-8 rounded hover:bg-gray-100 flex items-center justify-center transition-colors -mt-1 text-black font-bold text-lg"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">담당자</div>
              {isEditing ? (
                <AssigneeDropdown
                  users={workspaceUsers}
                  selectedUserIds={selectedAssigneeIds}
                  onUserSelect={setSelectedAssigneeIds}
                  placeholder="담당자를 선택하세요"
                />
              ) : (
                <div className="text-sm text-gray-900 text-left">
                  {scheduleDetail.assignees.length > 0
                    ? scheduleDetail.assignees
                        .map((assignee) => assignee.name)
                        .join(", ")
                    : "미지정"}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">
                일정 ID
              </div>
              <div className="text-sm text-gray-900 text-left">
                #{scheduleDetail.scheduleId}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">시작일</div>
              {isEditing ? (
                <Input
                  ref={startDateInputRef}
                  type="date"
                  value={editedSchedule?.startDate?.split(" ")[0] || ""}
                  onChange={(e) =>
                    setEditedSchedule((prev) =>
                      prev
                        ? {
                            ...prev,
                            startDate: e.target.value + " 00:00:00",
                          }
                        : null
                    )
                  }
                  onClick={() => {
                    try {
                      startDateInputRef.current?.showPicker?.();
                    } catch (error) {
                      // showPicker API를 지원하지 않는 브라우저의 경우 무시
                    }
                  }}
                  className="text-sm cursor-pointer"
                />
              ) : (
                <div className="text-sm text-gray-900 text-left">
                  {formatDate(scheduleDetail.startDate)}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">종료일</div>
              {isEditing ? (
                <Input
                  ref={endDateInputRef}
                  type="date"
                  value={editedSchedule?.endDate?.split(" ")[0] || ""}
                  onChange={(e) =>
                    setEditedSchedule((prev) =>
                      prev
                        ? {
                            ...prev,
                            endDate: e.target.value + " 23:59:59",
                          }
                        : null
                    )
                  }
                  onClick={() => {
                    try {
                      endDateInputRef.current?.showPicker?.();
                    } catch (error) {
                      // showPicker API를 지원하지 않는 브라우저의 경우 무시
                    }
                  }}
                  className="text-sm cursor-pointer"
                />
              ) : (
                <div className="text-sm text-gray-900 text-left">
                  {formatDate(scheduleDetail.endDate)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 pb-16 border-b border-gray-200 max-h-[300px] overflow-y-auto">
          <div className="text-xs text-gray-500 mb-2 text-left">내용</div>
          {isEditing ? (
            <Textarea
              value={editedSchedule?.content || ""}
              onChange={(e) =>
                setEditedSchedule((prev) =>
                  prev
                    ? {
                        ...prev,
                        content: e.target.value,
                      }
                    : null
                )
              }
              className="min-h-[150px] resize-none"
              placeholder="내용을 입력하세요..."
            />
          ) : (
            <div className="text-sm text-gray-900 whitespace-pre-wrap text-left">
              {scheduleDetail.content || "내용이 없습니다."}
            </div>
          )}
        </div>

        <div className="p-6 flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button
                color="white"
                onClick={() => {
                  setEditedSchedule(scheduleDetail);
                  setIsEditing(false);
                }}
              >
                취소
              </Button>
              <Button
                color="blue"
                disabled={isSubmitting || !editedSchedule?.title}
                onClick={async () => {
                  if (!editedSchedule) return;

                  setIsSubmitting(true);
                  try {
                    await updateSchedule(scheduleId, {
                      scheduleId: editedSchedule.scheduleId,
                      title: editedSchedule.title,
                      content: editedSchedule.content,
                      startDate: editedSchedule.startDate,
                      endDate: editedSchedule.endDate,
                      assignees: selectedAssigneeIds,
                    });

                    setScheduleDetail(editedSchedule);
                    setIsEditing(false);
                    onUpdate?.();
                  } catch (error) {
                    console.error("일정 수정 실패:", error);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                {isSubmitting ? "저장 중..." : "변경사항 저장"}
              </Button>
            </>
          ) : (
            <>
              <Button
                color="red"
                disabled={isDeleting}
                onClick={async () => {
                  if (!confirm("정말로 이 일정을 삭제하시겠습니까?")) return;

                  setIsDeleting(true);
                  try {
                    await deleteSchedule(scheduleId);
                    onUpdate?.();
                    onClose();
                  } catch (error) {
                    console.error("일정 삭제 실패:", error);
                  } finally {
                    setIsDeleting(false);
                  }
                }}
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </Button>
              <Button color="blue" onClick={() => setIsEditing(true)}>
                편집
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
