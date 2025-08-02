import { getPostList, type PostResponse } from "@/apis/post";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";

export function usePostList(status: string, keyword: string) {
  const [postList, setPostList] = useState<PostResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();

  useEffect(() => {
    loadingStore.setLoading("postList", true);
    setError(null);

    getPostList({
      type: status,
      role: "",
      search: keyword,
      page: "1",
      pageSize: "10",
    })
      .then((res) => {
        setPostList(res.data);
      })
      .finally(() => loadingStore.setLoading("postList", false));
  }, [status, keyword]);

  return {
    postList,
    isLoading: loadingStore.isLoading("postList"),
    error,
  };
}
