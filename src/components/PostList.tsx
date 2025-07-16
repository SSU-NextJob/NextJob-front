import { getPostList, type PostResponse } from "@/apis/post";
import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";

export const PostList = () => {
  const [postList, setPostList] = useState<PostResponse[]>([]);
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    getPostList({
      type: "",
      role: "",
      search: "",
      page: "1",
      pageSize: "10",
    }).then((res) => {
      if (res.success) setPostList(res.data);
      // else setError("데이터를 불러오지 못했습니다.");
    });
  }, []);

  return <PostCard posts={postList} />;
};
