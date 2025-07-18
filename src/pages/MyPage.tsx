import { useState, useEffect } from "react";
import { SideTab } from "@/components/Sidebar";
import { MyProfile } from "@/components/MyProfile";
import { MyProject } from "@/components/MyProject";
import { MyNotification } from "@/components/MyNotification";
import { useSearchParams } from "react-router-dom";

export const MyPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") as "profile" | "projects" | "alarm";
  const currentTab = tab || "profile";

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <SideTab currentTab={currentTab} onTabChange={() => {}} />
      <div className="flex-1 px-8 py-10">
        {currentTab === "profile" && <MyProfile />}
        {currentTab === "projects" && <MyProject />}
        {currentTab === "alarm" && <MyNotification />}
      </div>
    </div>
  );
};
