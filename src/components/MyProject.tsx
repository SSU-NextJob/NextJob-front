import { getJoinedProjectsAPI, type ProjectResponse } from "@/apis/project";
import { MyProjectsCard } from "@/components/MyProjectCard";
import { useEffect, useState } from "react";

const recruitmentPosts = [
  {
    id: 1,
    title: "AI Recipe Generator Team",
    description: "AI 요리 보조를 위한 개발자 모집",
    role: "모집 중", // 예시
    roles: ["프론트엔드 개발자", "백엔드 개발자", "+1"],
    linkedProject: "AI Recipe Generator",
    applicants: 8,
    date: "2024. 3. 15.",
    dDay: -459,
    type: "사이드 프로젝트",
  },
  {
    id: 2,
    title: "Task Management Platform",
    description: "팀 협업 태스크 관리 플랫폼 개발",
    role: "모집 중", // 예시
    roles: ["풀스택 개발자", "UI/UX 디자이너", "+1"],
    linkedProject: "Task Management App",
    applicants: 12,
    date: "2024. 4. 1.",
    dDay: -442,
    type: "해커톤",
  },
  {
    id: 3,
    title: "Weather Dashboard Development",
    description: "날씨 시각화 IoT 시스템",
    role: "모집 중", // 예시
    roles: ["프론트엔드 개발자", "데이터 사이언티스트", "+1"],
    linkedProject: "Weather Dashboard",
    applicants: 5,
    date: "2024. 2. 28.",
    dDay: -475,
    type: "사이드 프로젝트",
  },
];

export const MyProject = () => {
  const [createdProjectList, setCreatedProjectList] = useState<
    ProjectResponse[]
  >([]);
  const [joinedProjectList, setJoinedProjectList] = useState<ProjectResponse[]>(
    []
  );

  useEffect(() => {
    getJoinedProjectsAPI(1)
      .then((res) => {
        if (res.success) {
          setJoinedProjectList(res.data.participationProject);
          setCreatedProjectList(res.data.participationProject);
        }
      })
      .catch()
      .finally();
  }, []);
  return (
    <MyProjectsCard
      participatingProjects={joinedProjectList}
      createdProjects={createdProjectList}
      recruitmentPosts={recruitmentPosts}
    />
  );
};
