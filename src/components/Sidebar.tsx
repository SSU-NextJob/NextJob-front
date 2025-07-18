interface SideTabsProps {
  currentTab: "profile" | "projects" | "alarm";
  onTabChange: (tab: "profile" | "projects" | "alarm") => void;
}

export const SideTab = ({ currentTab, onTabChange }: SideTabsProps) => {
  return (
    <div className="flex flex-col w-48 border-r bg-white">
      <div
        onClick={() => onTabChange("profile")}
        className={`flex items-center cursor-pointer px-4 py-3 text-sm font-medium border-l-4 ${
          currentTab === "profile"
            ? "border-blue-500 text-blue-600 bg-blue-50"
            : "border-transparent text-gray-800 hover:bg-gray-50"
        }`}
      >
        <span className="mr-2">👤</span> 내 프로필
      </div>
      <div
        onClick={() => onTabChange("projects")}
        className={`flex items-center cursor-pointer px-4 py-3 text-sm font-medium border-l-4 ${
          currentTab === "projects"
            ? "border-blue-500 text-blue-600 bg-blue-50"
            : "border-transparent text-gray-800 hover:bg-gray-50"
        }`}
      >
        <span className="mr-2">📁</span> 내 프로젝트
      </div>

      <div
        onClick={() => onTabChange("alarm")}
        className={`flex items-center cursor-pointer px-4 py-3 text-sm font-medium border-l-4 ${
          currentTab === "alarm"
            ? "border-blue-500 text-blue-600 bg-blue-50"
            : "border-transparent text-gray-800 hover:bg-gray-50"
        }`}
      >
        <span className="mr-2">🔔</span> 내 알림
      </div>
    </div>
  );
};
