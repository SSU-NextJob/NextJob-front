import { getPostDetail, type PostDetailResponse } from "@/apis/post";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";

export function usePostDetail(postId: string | undefined) {
  const [postDetail, setPostDetail] = useState<PostDetailResponse>();
  const [error, setError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();

  useEffect(() => {
    if (!postId) {
      const errorMessage = "존재하지 않는 프로젝트입니다.";
      setError(errorMessage);
      return;
    }

    loadingStore.setLoading("postDetail", true);
    setError(null);

    getPostDetail(postId)
      .then((res) => {
        setPostDetail(res.data);
      })
      .finally(() => loadingStore.setLoading("postDetail", false));
  }, [postId]);

  return {
    postDetail,
    isLoading: loadingStore.isLoading("postDetail"),
    error,
  };
}
