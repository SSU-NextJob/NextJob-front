import { PostDetail } from "@/components/PostDetail";
import { useParams } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams(); // URL에서 id 추출

  if (!id) return <div>존재하지 않는 프로젝트입니다.</div>;

  return <PostDetail />;
}
