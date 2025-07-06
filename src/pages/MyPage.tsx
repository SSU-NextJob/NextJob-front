// import { SidebarTabs } from "./SidebarTabs";
// import { MyProfile } from "./MyProfile";
// import { MyProjects } from "./MyProjects";

import { useGetUser } from "@/features/user/apis";
import { MyProfile } from "@/widgets/MyPage/ui/MyProfile";
import { MyProject } from "@/widgets/MyPage/ui/MyProjects";
import { SideTab } from "@/widgets/MyPage/ui/SideTab";
import { useEffect, useState } from "react";

export const MyPage = () => {
  const [currentTab, setCurrentTab] = useState<"profile" | "projects">(
    "profile"
  );

  const { data } = useGetUser("1");

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  console.log("currentTab", currentTab);
  return (
    <div className="w-full mx-auto text-left py-8 px-4 md:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1"> 마이페이지</h1>
      </div>
      <div className="flex w-full h-full">
        {/* 왼쪽 탭 */}
        <SideTab currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* 오른쪽 콘텐츠 */}
        <div className="flex-1 p-6">
          {currentTab === "profile" && <MyProfile />}
          {currentTab === "projects" && <MyProject />}
        </div>
      </div>
    </div>
  );
};
