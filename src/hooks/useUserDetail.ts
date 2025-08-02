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
      setError("존재하지 않는 유저입니다.");
      return;
    }

    loadingStore.setLoading("userDetail", true);
    setError(null);

    // 사용자 상세 정보 가져오기
    getUserDetailAPI(parseInt(userId))
      .then((res) => {
        if (res.success) {
          setUserDetail(res.data);
        } else {
          setError("사용자 정보를 불러오지 못했습니다.");
        }
      })
      .catch(() => {
        setError("사용자 정보를 불러오지 못했습니다.");
      });

    // 사용자 프로젝트 정보 가져오기
    getUserProjectAPI(parseInt(userId))
      .then((res) => {
        if (res.success) {
          setUserProjectList(res);
        } else {
          setError("프로젝트 정보를 불러오지 못했습니다.");
        }
      })
      .catch(() => {
        setError("프로젝트 정보를 불러오지 못했습니다.");
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
