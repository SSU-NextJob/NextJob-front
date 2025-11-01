import { useState, useCallback } from "react";
import type { UserData } from "@/apis/user";
import { getUserListAPI } from "@/apis/user";
import { useLoadingStore } from "@/store/loadingStore";
import { useUserStore } from "@/store/userStore";

/**
 * Level 1 - 원자적 훅: 사용자 목록 데이터만 관리
 *
 * 단일 책임: 사용자 목록 데이터 fetching과 상태 관리만 담당
 * 재사용성: 다른 사용자 목록 기능에서도 동일한 로직으로 재사용 가능
 */
export function useUserList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const loadingStore = useLoadingStore();
  /**
   * @TODO
   * 이거 userId가 payload로 넘어가게 해야함
   * https://www.notion.so/API-21e8fd4abd8880c58928cf9ee748b30d?source=copy_link#21e8fd4abd888069b530d2ccd98fdc8a
   */
  const { userId } = useUserStore();

  const searchUsers = useCallback(
    async (userType?: string, keyword?: string) => {
      if (!userId) {
        setError("사용자 정보가 없습니다.");
        return;
      }

      loadingStore.setLoading("userList", true);
      setError(null);

      try {
        console.log("userId", userId);
        const res = await getUserListAPI({
          myUserId: userId,
          userType,
          search: keyword,
          page: "1",
          pageSize: "20",
        });

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
    },
    [loadingStore, userId]
  );

  return {
    users,
    error,
    isLoading: loadingStore.isLoading("userList"),
    searchUsers,
  };
}
