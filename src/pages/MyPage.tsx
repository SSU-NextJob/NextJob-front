import { useState } from "react";
import { SideTab } from "@/components/Sidebar";
import { MyProfile } from "@/components/MyProfile";
import { MyProject } from "@/components/MyProject";
import { MyNotification } from "@/components/MyNotification";

export const MyPage = () => {
  const [currentTab, setCurrentTab] = useState<
    "profile" | "projects" | "alarm"
  >("profile");

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <SideTab currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="flex-1 px-8 py-10">
        {currentTab === "profile" && <MyProfile />}
        {currentTab === "projects" && <MyProject />}
        {currentTab === "alarm" && <MyNotification />}
      </div>
    </div>
  );
};
