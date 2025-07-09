import { ProjectCard } from "@/components/ProjectCard";

const dummyProjects = [
  {
    id: 1,
    title: "AI 기반 레시피 생성기",
    techStack: ["React", "Node.js", "OpenAI"],
    deadline: "2024-02-15",
    type: "사이드 프로젝트",
    summary:
      "식단 선호도와 사용 가능한 재료를 기반으로 맞춤형 레시피를 생성하는 서비스입니다.",
    recruitmentSummary:
      "AI 기반 요리 도우미의 미래를 함께 만들어갈 열정적인 개발자를 찾습니다.",
    rolesNeeded: ["프론트엔드 개발자", "백엔드 개발자", "UI/UX 디자이너"],
    recruitingCount: 5,
    participatingCount: 2,
  },
  {
    id: 2,
    title: "블록체인 투표 시스템",
    techStack: ["Solidity", "Web3.js", "React"],
    deadline: "2024-02-16",
    type: "해커톤",
    summary: "블록체인 기술을 활용한 안전하고 투명한 투표 플랫폼입니다.",
    recruitmentSummary:
      "블록체인 기술로 민주주의를 혁신할 개발자를 모집합니다.",
    rolesNeeded: ["블록체인 개발자", "프론트엔드 개발자"],
    recruitingCount: 4,
    participatingCount: 3,
  },
  {
    id: 3,
    title: "멘탈 헬스 트래커",
    techStack: ["Flutter", "Firebase", "Python"],
    deadline: "2024-02-17",
    type: "공모전",
    summary: "기분 패턴을 추적하고 정신 건강 통계를 제공하는 모바일 앱입니다.",
    recruitmentSummary:
      "정신 건강 인식 개선과 지원을 위한 의미 있는 프로젝트에 함께하세요.",
    rolesNeeded: ["모바일 개발자", "데이터 과학자", "UI/UX 디자이너"],
    recruitingCount: 6,
    participatingCount: 4,
  },
  {
    id: 4,
    title: "스마트홈 대시보드",
    techStack: ["Vue.js", "IoT", "MongoDB"],
    deadline: "2024-02-18",
    type: "사이드 프로젝트",
    summary: "스마트홈 기기를 제어하고 모니터링할 수 있는 통합 대시보드입니다.",
    recruitmentSummary:
      "홈 오토메이션의 미래를 함께 만들어갈 IoT 개발자를 찾습니다!",
    rolesNeeded: ["프론트엔드 개발자", "IoT 개발자"],
    recruitingCount: 3,
    participatingCount: 1,
  },
  {
    id: 5,
    title: "언어 학습 게임",
    techStack: ["Unity", "C#", "PostgreSQL"],
    deadline: "2024-02-19",
    type: "해커톤",
    summary:
      "인터랙티브한 도전 과제를 통해 언어 학습을 게임처럼 즐기게 하는 프로젝트입니다.",
    recruitmentSummary:
      "전 세계 사용자에게 재미있는 언어 학습 경험을 제공할 팀원을 찾습니다.",
    rolesNeeded: ["게임 개발자", "백엔드 개발자", "UI/UX 디자이너"],
    recruitingCount: 5,
    participatingCount: 3,
  },
  {
    id: 6,
    title: "탄소발자국 계산기",
    techStack: ["Next.js", "TypeScript", "Supabase"],
    deadline: "2024-02-20",
    type: "공모전",
    summary: "개인의 탄소배출량을 계산하고 인사이트를 제공하는 서비스입니다.",
    recruitmentSummary:
      "데이터 기반 솔루션으로 기후변화에 대응할 팀원을 찾습니다.",
    rolesNeeded: ["풀스택 개발자", "데이터 과학자"],
    recruitingCount: 4,
    participatingCount: 2,
  },
  {
    id: 7,
    title: "가상 스터디 그룹",
    techStack: ["WebRTC", "React", "Socket.io"],
    deadline: "2024-02-21",
    type: "사이드 프로젝트",
    summary: "학생들을 위한 협업 도구가 포함된 가상 스터디룸 서비스입니다.",
    recruitmentSummary:
      "효율적인 그룹 학습을 위한 온라인 협업 공간을 함께 만들어갑시다.",
    rolesNeeded: ["WebRTC 개발자", "프론트엔드 개발자"],
    recruitingCount: 4,
    participatingCount: 4,
  },
];
export const ProjectList = () => {
  return <ProjectCard projects={dummyProjects} />;
};
