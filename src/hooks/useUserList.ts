import { useState, useEffect, useCallback } from "react";
import type { UserData } from "@/apis/user";
import { getUserListAPI } from "@/apis/user";
import { useLoadingStore } from "@/store/loadingStore";

interface UserListParams {
  userType: string;
  keyword: string;
}

export function useUserList({ userType, keyword }: UserListParams) {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();

  const searchUsers = useCallback(async (searchKeyword?: string) => {
    loadingStore.setLoading("userList", true);
    setError(null);

    try {
      console.log('...keyword :: ', searchKeyword || keyword)
      const apiParams: any = {
        search: searchKeyword || keyword,
        userType,
        page: "1",
        pageSize: "20",
      };

      const res = await getUserListAPI(apiParams);

      if (res.success) {
        setUsers(res.data);
      } else {
        setError("데이터를 불러오지 못했습니다.");
      }
    } catch {
      setError("에러가 발생했습니다.");
    } finally {
      loadingStore.setLoading("userList", false);
    }
  }, [userType, keyword, loadingStore]);

  // 초기 렌더링 시 데이터 로드
  useEffect(() => {
    searchUsers();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return {
    users,
    error,
    isLoading: loadingStore.isLoading("userList"),
    searchUsers,
  };
} 