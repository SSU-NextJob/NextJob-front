import MyProfileCard from "@/entities/myPage/ui/myProfileCard";

const profileData = {
  name: "사라 첸",
  role: "풀스택 개발자",
  oneLineIntro:
    "확장 가능한 웹 애플리케이션 및 AI 통합 구축에 열정을 가지고 있습니다.",
  aboutMe:
    "저는 5년 이상의 경력을 가진 풀스택 개발자로, 실제 영향을 미치는 프로젝트를 수행하고 다양한 팀과 협업하는 것을 좋아합니다. 주요 기술 스택은 React, Node.js, Python, 그리고 클라우드 기술입니다.",
  joinedProjects: [
    {
      id: 1,
      title: "AI 레시피 생성기",
      description: "AI를 사용해 맞춤형 레시피를 생성합니다.",
      role: "리드 개발자",
      date: "2024. 3. 15.",
      tags: ["사이드 프로젝트"],
    },
    {
      id: 2,
      title: "블록체인 투표 시스템",
      description: "블록체인을 활용한 안전한 투표 플랫폼",
      role: "백엔드 개발자",
      date: "2024. 1. 30.",
      tags: ["해커톤"],
    },
    {
      id: 3,
      title: "스마트홈 대시보드",
      description: "IoT 기기 제어용 대시보드",
      role: "프론트엔드 개발자",
      date: "2024. 2. 20.",
      tags: ["해커톤"],
    },
  ],
};
export const MyProfile = () => {
  return <MyProfileCard {...profileData} onSave={() => {}} />;
};
