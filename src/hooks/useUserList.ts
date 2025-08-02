import { useState, useCallback } from "react";
import type { UserData } from "@/apis/user";
import { getUserListAPI } from "@/apis/user";
import { useLoadingStore } from "@/store/loadingStore";

export function useUserList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const loadingStore = useLoadingStore();

  const searchUsers = useCallback(async (userType?: string, keyword?: string) => {
    loadingStore.setLoading("userList", true);
    setError(null);

    try {
      const apiParams: any = {
        page: "1",
        pageSize: "20",
      };

      // userType이 undefined가 아니고 실제 값이 있을 때만 추가
      if (userType !== undefined && userType && userType.trim() !== "") {
        apiParams.userType = userType;
      }

      // keyword가 undefined가 아니고 실제 값이 있을 때만 추가
      if (keyword !== undefined && keyword && keyword.trim() !== "") {
        apiParams.search = keyword;
      }

      const res = await getUserListAPI(apiParams);

      if (res.success) {
        setUsers(res.data);
        setIsInitialized(true);
      } else {
        setError("데이터를 불러오지 못했습니다.");
      }
    } catch {
      setError("에러가 발생했습니다.");
    } finally {
      loadingStore.setLoading("userList", false);
    }
  }, [loadingStore]);

  return {
    users,
    error,
    isLoading: loadingStore.isLoading("userList"),
    isInitialized,
    searchUsers,
  };
} 