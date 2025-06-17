import { MyProjectsCard } from "@/entities/myPage/ui/myProjectCard";

const participatingProjects = [
  {
    id: 1,
    title: "AI Recipe Generator",
    description: "AI를 활용한 맞춤형 레시피 생성기",
    role: "리드 개발자",
    date: "2024. 3. 15.",
    type: "사이드 프로젝트",
    dDay: -459,
  },
  {
    id: 2,
    title: "Blockchain Voting System",
    description: "블록체인을 이용한 보안 투표 시스템",
    role: "백엔드 개발자",
    date: "2024. 1. 30.",
    type: "해커톤",
    dDay: -504,
  },
  {
    id: 3,
    title: "Smart Home Dashboard",
    description: "IoT 기반 스마트홈 대시보드",
    role: "프론트엔드 개발자",
    date: "2024. 2. 20.",
    type: "공모전",
    dDay: -483,
  },
];

const createdProjects = [
  {
    id: 1,
    title: "AI Recipe Generator",
    description: "AI를 활용한 맞춤형 레시피 생성기",
    type: "사이드 프로젝트",
    date: "2024. 3. 15.",
    membersCount: 5,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "팀 협업용 태스크 관리 플랫폼",
    type: "해커톤",
    date: "2024. 4. 1.",
    membersCount: 5,
  },
];

const recruitmentPosts = [
  {
    id: 1,
    projectTitle: "AI Recipe Generator Team",
    description: "AI 요리 보조를 위한 개발자 모집",
    roles: ["프론트엔드 개발자", "백엔드 개발자", "+1"],
    linkedProject: "AI Recipe Generator",
    applicants: 8,
    date: "2024. 3. 15.",
    dDay: -459,
    type: "사이드 프로젝트",
  },
  {
    id: 2,
    projectTitle: "Task Management Platform",
    description: "팀 협업 태스크 관리 플랫폼 개발",
    roles: ["풀스택 개발자", "UI/UX 디자이너", "+1"],
    linkedProject: "Task Management App",
    applicants: 12,
    date: "2024. 4. 1.",
    dDay: -442,
    type: "해커톤",
  },
  {
    id: 3,
    projectTitle: "Weather Dashboard Development",
    description: "날씨 시각화 IoT 시스템",
    roles: ["프론트엔드 개발자", "데이터 사이언티스트", "+1"],
    linkedProject: "Weather Dashboard",
    applicants: 5,
    date: "2024. 2. 28.",
    dDay: -475,
    type: "사이드 프로젝트",
  },
];

export const MyProject = () => {
  return (
    <MyProjectsCard
      participatingProjects={participatingProjects}
      createdProjects={createdProjects}
      recruitmentPosts={recruitmentPosts}
    />
  );
};
