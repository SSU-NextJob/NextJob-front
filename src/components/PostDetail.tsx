import { getPostDetail, type PostDetailResponse } from "@/apis/post";
import { PostDetailCard } from "@/components/PostDetailCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PostDetail = () => {
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState<PostDetailResponse>();
  useEffect(() => {
    if (!id) return;
    getPostDetail(id)
      .then((res) => {
        if (res.success) setPostDetail(res.data);
      })
      .catch()
      .finally();
  }, []);
  return <PostDetailCard post={postDetail} />;
};
