import {
  getUserDetailAPI,
  type UserData,
  getUserProjectAPI,
  type UserProjectListResponse,
} from "@/apis/user";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";

export function useUserDetail(userId: string | undefined) {
  const [userDetail, setUserDetail] = useState<UserData>();
  const [userProjectList, setUserProjectList] =
    useState<UserProjectListResponse>();
  const [error, setError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();

  useEffect(() => {
    if (!userId) {
      const errorMessage = "존재하지 않는 유저입니다.";
      setError(errorMessage);
      return;
    }

    loadingStore.setLoading("userDetail", true);
    setError(null);

    // 사용자 상세 정보 가져오기
    getUserDetailAPI(parseInt(userId)).then((res) => {
      setUserDetail(res.data);
    });

    // 사용자 프로젝트 정보 가져오기
    getUserProjectAPI(parseInt(userId))
      .then((res) => {
        setUserProjectList(res);
      })
      .finally(() => loadingStore.setLoading("userDetail", false));
  }, [userId]);

  return {
    userDetail,
    userProjectList,
    isLoading: loadingStore.isLoading("userDetail"),
    error,
  };
}
