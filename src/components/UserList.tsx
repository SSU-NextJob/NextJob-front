// import { UserCard } from "@/components/UserCard";

// // getUserListAPI

// export const UserList = () => {
//   return <UserCard members={members} />;
// };

// ... 기존 import ...
import { useEffect, useState } from "react";
import type { UserData } from "@/apis/user";
import { getUserListAPI } from "@/apis/user";
import { UserCard } from "@/components/UserCard";

export const UserList = () => {
  const [users, setUsers] = useState<UserData[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserListAPI({
      userType: "",
      search: "",
      page: "1",
      pageSize: "20",
    })
      .then((res) => {
        if (res.success) setUsers(res.data);
        else setError("데이터를 불러오지 못했습니다.");
      })
      .catch(() => setError("에러가 발생했습니다."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return <UserCard users={users} />;
};
