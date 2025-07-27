import { getPostList, type PostResponse } from "@/apis/post";
import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";
import { Loading } from "@/components/atoms/Loading";
import { useLoadingStore } from "@/store/loadingStore";

type PostListProps = {
  projectType: string;
  keyword: string;
};

export const PostList = ({ projectType, keyword }: PostListProps) => {
  const [postList, setPostList] = useState<PostResponse[]>([]);
  const loadingStore = useLoadingStore();
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    loadingStore.setLoading("postList", true);
    getPostList({
      type: projectType,
      role: "",
      search: keyword,
      page: "1",
      pageSize: "10",
    })
      .then((res) => {
        if (res.success) setPostList(res.data);
        // else setError("데이터를 불러오지 못했습니다.");
      })
      .finally(() => loadingStore.setLoading("postList", false));
  }, [projectType, keyword]);

  if (loadingStore.isLoading("postList")) return <Loading />;
  if (postList.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
        <svg
          className="w-16 h-16 mb-4 text-blue-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <div className="text-lg font-semibold">
          찾으시는 프로젝트가 없습니다!
        </div>
      </div>
    );
  }
  return <PostCard posts={postList} />;
};
