import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../atoms/Button";
import { Card, CardContent } from "../atoms/Card";
import { getSchedules, type Schedule } from "@/apis/schedules";
import { ScheduleDetailModal } from "../modules/@modal/ScheduleDetailModal";
import { ScheduleCreateModal } from "../modules/@modal/ScheduleCreateModal";

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

export function CalendarView() {
  const [searchParams] = useSearchParams();
  const _workspaceId = searchParams.get("workspaceId");

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalDate, setCreateModalDate] = useState("");

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

  const fetchSchedules = useCallback(async () => {
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
  }, [currentDate]);

  useEffect(() => {
    fetchSchedules();
  }, [currentDate, fetchSchedules]);

  const getSchedulesForDate = (year: number, month: number, day: number) => {
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

  const handleCreateClick = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setCreateModalDate(dateStr);
    setIsCreateModalOpen(true);
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
                ? getSchedulesForDate(
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
                              onClick={() =>
                                setSelectedScheduleId(schedule.scheduleId)
                              }
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

      {isCreateModalOpen && (
        <ScheduleCreateModal
          selectedDate={createModalDate}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={fetchSchedules}
        />
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
