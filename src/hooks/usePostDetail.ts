import { getPostDetail, type PostDetailResponse } from "@/apis/post";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";

export function usePostDetail(postId: string | undefined) {
  const [postDetail, setPostDetail] = useState<PostDetailResponse>();
  const [error, setError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();

  useEffect(() => {
    if (!postId) {
      setError("존재하지 않는 프로젝트입니다.");
      return;
    }

    loadingStore.setLoading("postDetail", true);
    setError(null);

    getPostDetail(postId)
      .then((res) => {
        if (res.success) {
          setPostDetail(res.data);
        } else {
          setError("데이터를 불러오지 못했습니다.");
        }
      })
      .catch(() => {
        setError("데이터를 불러오지 못했습니다.");
      })
      .finally(() => loadingStore.setLoading("postDetail", false));
  }, [postId]);

  return {
    postDetail,
    isLoading: loadingStore.isLoading("postDetail"),
    error,
  };
}
