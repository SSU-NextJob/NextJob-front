import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../atoms/Button";
import { Card, CardContent } from "../atoms/Card";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { createSchedule, getSchedules, type Schedule } from "@/apis/schedules";
import { useUserStore } from "@/store/userStore";
import { ScheduleDetailModal } from "../modules/@modal/ScheduleDetailModal";

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "progress" | "done";
  assignee: { name: string };
  dueDate: string;
  startDate: string;
}

export function CalendarView() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const { userId } = useUserStore();

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date: Date, day: number) => {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();


  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const response = await getSchedules({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      if (response.success) {
        setSchedules(response.data);
      }
    } catch (error) {
      console.error("일정 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [currentDate]);

  useEffect(() => {
    fetchSchedules();
  }, []);


  const getTasksForDate = (year: number, month: number, day: number) => {
    const checkDate = new Date(year, month, day);

    return schedules.filter((schedule) => {
      const startDate = new Date(schedule.startDate);
      const endDate = new Date(schedule.endDate);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      checkDate.setHours(12, 0, 0, 0);

      return checkDate >= startDate && checkDate <= endDate;
    });
  };


  const handleCloseModal = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleCreateClick = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setIsCreating(true);
    setSelectedTask(null);
    setEditedTask({
      id: `task-${Date.now()}`,
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      assignee: { name: "" },
      dueDate: dateStr,
      startDate: dateStr,
    });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "설정되지 않음";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex-1 p-6">
      <div className="mb-6" style={{ marginTop: "32px" }}>
        <div>
          <h1 className="text-2xl font-semibold mb-2 text-gray-900">캘린더</h1>
          <p className="text-gray-600">일정을 관리하고 추적하세요</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex space-x-2">
              <Button color="white" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                color="white"
                onClick={() =>
                  setCurrentDate(
                    new Date(today.getFullYear(), today.getMonth(), 1)
                  )
                }
              >
                오늘
              </Button>
              <Button color="white" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="bg-gray-50 p-3 text-center text-sm font-medium border-r border-b border-gray-200 last:border-r-0"
              >
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const schedulesForDay = day
                ? getTasksForDate(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                : [];

              return (
                <div
                  key={index}
                  className={`
                    min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 relative
                    ${index >= 35 ? "border-b-0" : ""}
                    ${day === null ? "bg-gray-50" : "bg-white"}
                    ${
                      day && isToday(currentDate, day)
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    }
                  `}
                  onMouseEnter={() => day && setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  {day && (
                    <div className="flex flex-col h-full gap-1">
                      <div className="flex items-start justify-between mb-1">
                        <span
                          className={`
                            text-sm font-medium
                            ${
                              isToday(currentDate, day)
                                ? "text-blue-600 font-semibold"
                                : "text-gray-900"
                            }
                          `}
                        >
                          {day}
                        </span>

                        {hoveredDay === day && (
                          <div
                            onClick={() =>
                              handleCreateClick(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day
                              )
                            }
                            className="w-5 h-5 rounded hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                          >
                            <Plus size={16} />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 overflow-y-auto">
                        {isLoading ? (
                          <div className="text-xs text-gray-500">
                            로딩 중...
                          </div>
                        ) : (
                          schedulesForDay.map((schedule) => (
                            <div
                              key={schedule.scheduleId}
                              className="bg-blue-100 border border-blue-200 rounded px-2 py-1 cursor-pointer hover:bg-blue-200 transition-colors text-xs"
                              onClick={() => setSelectedScheduleId(schedule.scheduleId)}
                            >
                              <div className="truncate text-blue-900">
                                {schedule.title}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {(selectedTask || isCreating) && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                {isCreating || isEditing ? (
                  <Input
                    value={editedTask?.title || ""}
                    onChange={(e) =>
                      setEditedTask((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                      )
                    }
                    className="text-2xl font-semibold border-none p-0 focus:ring-0"
                    placeholder="제목 없음"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedTask?.title}
                  </h2>
                )}
                <button
                  onClick={handleCloseModal}
                  className="h-8 w-8 rounded hover:bg-gray-100 flex items-center justify-center transition-colors -mt-1 text-black font-bold text-lg"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1 text-left">
                    담당자
                  </div>
                  {isCreating || isEditing ? (
                    <Input
                      value={editedTask?.assignee?.name || ""}
                      onChange={(e) =>
                        setEditedTask((prev) =>
                          prev
                            ? {
                                ...prev,
                                assignee: { name: e.target.value },
                              }
                            : null
                        )
                      }
                      className="text-sm"
                      placeholder="미지정"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {selectedTask?.assignee?.name || "미지정"}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1 text-left">
                    생성자
                  </div>
                  <div className="text-sm text-gray-900">
                    {selectedTask?.assignee?.name || "알 수 없음"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1 text-left">
                    시작일
                  </div>
                  {isCreating || isEditing ? (
                    <Input
                      type="date"
                      value={editedTask?.startDate || ""}
                      onChange={(e) =>
                        setEditedTask((prev) =>
                          prev
                            ? {
                                ...prev,
                                startDate: e.target.value,
                              }
                            : null
                        )
                      }
                      className="text-sm cursor-pointer"
                      onClick={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                          e.target.showPicker?.();
                        }
                      }}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {formatDate(selectedTask?.startDate || "")}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1 text-left">
                    종료일
                  </div>
                  {isCreating || isEditing ? (
                    <Input
                      type="date"
                      value={editedTask?.dueDate || ""}
                      onChange={(e) =>
                        setEditedTask((prev) =>
                          prev
                            ? {
                                ...prev,
                                dueDate: e.target.value,
                              }
                            : null
                        )
                      }
                      className="text-sm cursor-pointer"
                      onClick={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                          e.target.showPicker?.();
                        }
                      }}
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {formatDate(selectedTask?.dueDate || "")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-gray-200">
              <div className="text-xs text-gray-500 mb-2 text-left">설명</div>
              {isCreating || isEditing ? (
                <Textarea
                  value={editedTask?.description || ""}
                  onChange={(e) =>
                    setEditedTask((prev) =>
                      prev
                        ? {
                            ...prev,
                            description: e.target.value,
                          }
                        : null
                    )
                  }
                  className="min-h-[150px] resize-none"
                  placeholder="설명을 입력하세요..."
                />
              ) : (
                <div className="text-sm text-gray-900 whitespace-pre-wrap">
                  {selectedTask?.description || "설명이 없습니다."}
                </div>
              )}
            </div>

            <div className="p-6 flex justify-end gap-2">
              {isCreating ? (
                <Button
                  color="blue"
                  disabled={isSubmitting || !editedTask?.title}
                  onClick={async () => {
                    if (!editedTask || !workspaceId || !userId) return;

                    setIsSubmitting(true);
                    try {
                      await createSchedule({
                        workspaceId: parseInt(workspaceId),
                        title: editedTask.title,
                        content: editedTask.description,
                        startDate: editedTask.startDate + " 00:00:00",
                        endDate: editedTask.dueDate + " 23:59:59",
                        assignees: [], // 추후 담당자 선택 기능 추가 시 수정
                        userId: userId,
                      });

                      // 성공 시 모달 닫기 및 일정 목록 새로고침
                      handleCloseModal();
                      fetchSchedules();
                    } catch (error) {
                      console.error("일정 생성 실패:", error);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  {isSubmitting ? "생성 중..." : "생성"}
                </Button>
              ) : isEditing ? (
                <>
                  <Button
                    color="white"
                    onClick={() => {
                      setEditedTask(selectedTask ? { ...selectedTask } : null);
                      setIsEditing(false);
                    }}
                  >
                    취소
                  </Button>
                  <Button color="blue">변경사항 저장</Button>
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
      )}

      {selectedScheduleId && (
        <ScheduleDetailModal
          scheduleId={selectedScheduleId}
          onClose={() => setSelectedScheduleId(null)}
          onUpdate={fetchSchedules}
        />
      )}
    </div>
  );
}
