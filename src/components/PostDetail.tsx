import { getPostDetail, type PostDetailResponse } from "@/apis/post";
import { PostDetailCard } from "@/components/PostDetailCard";
import { useEffect, useState } from "react";

export const PostDetail = () => {
  const [postDetail, setPostDetail] = useState<PostDetailResponse>();
  useEffect(() => {
    getPostDetail(2)
      .then((res) => {
        if (res.success) setPostDetail(res.data);
      })
      .catch()
      .finally();
  }, []);
  return <PostDetailCard post={postDetail} />;
};
