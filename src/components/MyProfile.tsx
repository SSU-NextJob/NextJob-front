import { getJoinedProjectsAPI, type ProjectResponse } from "@/apis/project";
import { getUserDetailAPI } from "@/apis/user";
import MyProfileCard, { type UserProfile } from "@/components/MyProfileCard";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export const MyProfile = () => {
  const { userId } = useUserStore();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [joinedProjectList, setJoinedProjectList] = useState<ProjectResponse[]>(
    []
  );

  useEffect(() => {
    if (!userId) return;

    getUserDetailAPI(userId).then((res) => {
      if (res.success)
        setUserProfile({
          profileImage: res.data.profileImage,
          userName: res.data.name,
          userType: res.data.userType,
          description: res.data.description,
          techStack: res.data.techStack,
        });
    });

    getJoinedProjectsAPI(userId)
      .then((res) => {
        if (res.success) setJoinedProjectList(res.data.participationProject);
      })
      .catch()
      .finally();
  }, [userId]);
  return (
    <MyProfileCard
      userProfile={userProfile}
      joinedProjects={joinedProjectList}
      onSave={() => {}}
    />
  );
};
