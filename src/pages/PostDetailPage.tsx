import { PostDetail } from "@/components/PostDetail";
import { usePostDetail } from "@/hooks/usePostDetail";
import { useParams } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams();
  const { postDetail, isLoading, error } = usePostDetail(id);

  return (
    <PostDetail postDetail={postDetail} isLoading={isLoading} error={error} />
  );
}
