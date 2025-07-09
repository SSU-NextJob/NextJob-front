import { ProjectDetailCard } from "@/components/ProjectDetailCard";

const projectDetail = {
  title: "블록체인 투표 시스템",
  deadline: "2024. 1. 30.",
  location: "대한민국, 숭실대",
  membersNeeded: 3,
  type: "해커톤",
  description:
    "투명성과 보안, 불변성을 보장하는 탈중앙화 블록체인 기반 투표 플랫폼입니다.",
  recruitmentSummary: "블록체인 기술로 민주주의를 혁신할 팀원들을 모집합니다.",
  roles: ["블록체인 개발자", "프론트엔드 개발자"],
  techStack: ["Solidity", "Web3.js", "React"],
  requirements: ["Solidity 개발 경험", "Web3 개발 지식", "React 활용 능력"],
  benefits: [
    "해커톤 수상 가능성",
    "블록체인 전문성 향상",
    "네트워킹 기회 제공",
  ],
  creator: "Sarah Chen",
};
export const ProjectDetail = () => {
  return <ProjectDetailCard project={projectDetail} />;
};
