import { getPostList, type PostResponse } from "@/apis/post";
import { getJoinedProjectsAPI, type ProjectResponse } from "@/apis/project";
import { MyProjectsCard } from "@/components/MyProjectCard";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export const MyProject = () => {
  const { userId } = useUserStore();

  const [createdProjectList, setCreatedProjectList] = useState<
    ProjectResponse[]
  >([]);
  const [joinedProjectList, setJoinedProjectList] = useState<ProjectResponse[]>(
    []
  );
  const [recruitPostList, setRecruitPostList] = useState<PostResponse[]>([]);

  useEffect(() => {
    if (!userId) return;
    getJoinedProjectsAPI(userId)
      .then((res) => {
        if (res.success) {
          setJoinedProjectList(res.data.participationProject);
          setCreatedProjectList(res.data.createdProject);
        }
      })
      .catch()
      .finally();

    getPostList({
      type: "",
      role: "",
      search: "",
      userId: String(userId),
      page: "1",
      pageSize: "10",
    }).then((res) => {
      if (res.success) setRecruitPostList(res.data);
      // else setError("데이터를 불러오지 못했습니다.");
    });
  }, []);
  return (
    <MyProjectsCard
      participatingProjects={joinedProjectList}
      createdProjects={createdProjectList}
      recruitPostList={recruitPostList}
    />
  );
};
