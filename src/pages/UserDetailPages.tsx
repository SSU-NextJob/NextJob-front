import { useParams } from "react-router-dom";
import { UserDetail } from "@/components/UserDetail";
import { useEffect, useState } from "react";
import {
  getUserDetailAPI,
  getUserProjectAPI,
  UserData,
  UserProjectData,
} from "@/apis/user/index";

export default function UserDetailPage() {
  const { id } = useParams(); // URL에서 id 추출

  const [user, setUser] = useState<UserData[]>();
  const [userProject, setUserProject] = useState<UserProjectData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("id", id);
  if (!id) return <div>존재하지 않는 유저입니다.</div>;
  useEffect(() => {
    setLoading(true);
    setError(null);

    const detailPromise = getUserDetailAPI({ userId: id });
    const projectPromise = getUserProjectAPI({ userId: id });

    Promise.all([detailPromise, projectPromise])
      .then(([detailRes, projectRes]) => {
        if (detailRes.success) setUser(detailRes.data);
        else setError("유저 정보를 불러오지 못했습니다.");

        if (projectRes.success) setUserProject(projectRes.data);
        else setError("프로젝트 정보를 불러오지 못했습니다.");
        console.log("projectRes.data", projectRes.data);
      })
      .catch(() => {
        setError("에러가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  console.log("userProject", userProject);
  return <UserDetail user={user} userProject={userProject} />;
}
