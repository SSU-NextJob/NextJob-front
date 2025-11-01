import { useState, useEffect } from "react";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { Textarea } from "../../atoms/Textarea";
import { getScheduleDetail, updateSchedule, type ScheduleDetail } from "@/apis/schedules";

interface ScheduleDetailModalProps {
  scheduleId: number;
  onClose: () => void;
  onUpdate?: () => void;
}

export function ScheduleDetailModal({ scheduleId, onClose, onUpdate }: ScheduleDetailModalProps) {
  const [scheduleDetail, setScheduleDetail] = useState<ScheduleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSchedule, setEditedSchedule] = useState<ScheduleDetail | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchScheduleDetail = async () => {
    setIsLoading(true);
    try {
      const response = await getScheduleDetail(scheduleId);
      if (response.success) {
        setScheduleDetail(response.data);
        setEditedSchedule(response.data);
      }
    } catch (error) {
      console.error("일정 상세 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleDetail();
  }, [scheduleId]);

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
          <div className="text-center text-red-500">일정을 불러올 수 없습니다.</div>
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
              <div className="text-sm text-gray-900">
                {scheduleDetail.assignees.length > 0
                  ? scheduleDetail.assignees.map(assignee => assignee.name).join(", ")
                  : "미지정"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">일정 ID</div>
              <div className="text-sm text-gray-900">#{scheduleDetail.scheduleId}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">시작일</div>
              {isEditing ? (
                <Input
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
                  className="text-sm cursor-pointer"
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {formatDate(scheduleDetail.startDate)}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1 text-left">종료일</div>
              {isEditing ? (
                <Input
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
                  className="text-sm cursor-pointer"
                />
              ) : (
                <div className="text-sm text-gray-900">
                  {formatDate(scheduleDetail.endDate)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-200">
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
            <div className="text-sm text-gray-900 whitespace-pre-wrap">
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
                      assignees: editedSchedule.assignees.map(a => a.userId),
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
              <Button color="red">삭제</Button>
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