import {
  getWorkspaceDetail,
  type WorkspaceDetailResponse,
} from "@/apis/workspace";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";

export function useWorkspace(workspaceId: string | undefined) {
  const [workspaceDetail, setWorkspaceDetail] =
    useState<WorkspaceDetailResponse>();
  const [error, setError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();

  useEffect(() => {
    if (!workspaceId) {
      const errorMessage = "error";
      setError(errorMessage);
      return;
    }

    loadingStore.setLoading("workspaceDetail", true);
    setError(null);

    getWorkspaceDetail(workspaceId)
      .then((res) => {
        setWorkspaceDetail(res);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => loadingStore.setLoading("workspaceDetail", false));
  }, [workspaceId]);

  return {
    workspaceDetail,
    isLoading: loadingStore.isLoading("workspaceDetail"),
    error,
  };
}
