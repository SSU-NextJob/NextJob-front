import { UserDetailCard } from "@/entities/user/ui/UserDetailCard";

const userDetail = {
  name: "알렉스 로드리게즈",
  role: "UI/UX 디자이너",
  location: "미국, 뉴욕",
  about: "모바일과 웹을 위한 직관적이고 아름다운 사용자 경험을 만듭니다.",
  experience: "3년 이상",
  availability: "풀타임",
  skills: ["Figma", "Sketch", "Prototyping", "사용자 조사"],
  pastProjects: [
    {
      title: "피트니스 추적 앱",
      description: "50K+ 다운로드를 기록한 사용자 친화적 피트니스 앱 설계",
      duration: "4개월",
      role: "리드 디자이너",
    },
    {
      title: "SaaS 대시보드",
      description: "비즈니스 분석을 위한 종합 대시보드 설계",
      duration: "5개월",
      role: "UI 디자이너",
    },
    {
      title: "피트니스 추적 앱",
      description: "50K+ 다운로드를 기록한 사용자 친화적 피트니스 앱 설계",
      duration: "4개월",
      role: "리드 디자이너",
    },
    {
      title: "SaaS 대시보드",
      description: "비즈니스 분석을 위한 종합 대시보드 설계",
      duration: "5개월",
      role: "UI 디자이너",
    },
  ],
};

export const UserDetail = () => {
  return <UserDetailCard {...userDetail} />;
};
