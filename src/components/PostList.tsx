import { getPostList, type PostResponse } from "@/apis/post";
import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";

type PostListProps = {
  projectType: string;
  keyword: string;
};

export const PostList = ({ projectType, keyword }: PostListProps) => {
  const [postList, setPostList] = useState<PostResponse[]>([]);
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    getPostList({
      type: projectType,
      role: "",
      search: keyword,
      page: "1",
      pageSize: "10",
    }).then((res) => {
      if (res.success) setPostList(res.data);
      // else setError("데이터를 불러오지 못했습니다.");
    });
  }, [projectType, keyword]);

  return <PostCard posts={postList} />;
};
