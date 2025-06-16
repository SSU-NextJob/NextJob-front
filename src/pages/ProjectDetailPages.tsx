import { useParams } from "react-router-dom";
import { ProjectDetail } from "@/widgets/ProjectDetailList/ui/ProjectDetail";

export default function ProjectDetailPage() {
  const { id } = useParams(); // URL에서 id 추출
  console.log("id", id);
  // const project = dummyProjects.find((p) => p.id === Number(id));

  if (!id) return <div>존재하지 않는 프로젝트입니다.</div>;

  return <ProjectDetail />;
}
