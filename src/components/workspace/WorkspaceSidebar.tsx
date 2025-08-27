// 표준 라이브러리
import { useState } from "react";

// 서드파티 라이브러리
import { Calendar, FileText, Trello } from "lucide-react";

// 내부 UI 컴포넌트
import { Button } from "@/components/atoms/Button";

// 뷰 타입 정의
type ViewType = "kanban" | "calendar" | "documents";

/**
 * 워크스페이스 사이드바 컴포넌트의 Props 타입
 */
interface WorkspaceSidebarProps {
  /** 현재 활성 뷰 */
  activeView: ViewType;
  /** 뷰 변경 이벤트 핸들러 */
  onViewChange: (view: ViewType) => void;
}

/**
 * 워크스페이스 사이드바 컴포넌트
 * 워크스페이스 내 다양한 뷰 간 네비게이션을 제공합니다.
 */
export function WorkspaceSidebar({ activeView, onViewChange }: WorkspaceSidebarProps) {
  // 네비게이션 메뉴 항목
  const NAVIGATION_ITEMS = [
    { id: "kanban" as const, label: "Kanban Board", icon: Trello },
    { id: "calendar" as const, label: "Calendar", icon: Calendar },
    { id: "documents" as const, label: "Documents", icon: FileText },
  ] as const;

  return (
    <aside 
      className="w-64 h-full bg-white border-r border-gray-200 flex flex-col"
      role="navigation"
      aria-label="Workspace navigation"
    >
      {/* Header */}
      <header className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">Workspace</h1>
        <p className="text-sm text-gray-600 mt-1">Project Management</p>
      </header>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start h-10 font-normal ${
                  isActive 
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}