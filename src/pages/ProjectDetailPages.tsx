import { ProjectDetail } from "@/components/ProjectDetail";
import { useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams(); // URL?먯꽌 id 異붿텧
  console.log("id", id);
  // const project = dummyProjects.find((p) => p.id === Number(id));

  if (!id) return <div>議댁옱?섏? ?딅뒗 ?꾨줈?앺듃?낅땲??</div>;

  return <ProjectDetail />;
}

// 마이페이지의 컴포넌트를 조합하여 widgets으로 사용하던 것들이 사라짐
// components에서 domain 이름으로 폴더 만들고 해당 컴포넌트들 모으기? 그 폴더엔 종속 hooks 같은 것도 모으고
