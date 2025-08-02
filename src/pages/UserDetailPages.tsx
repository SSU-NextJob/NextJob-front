import { UserDetail } from "@/components/UserDetail";
import { useUserDetail } from "@/hooks/useUserDetail";
import { useParams } from "react-router-dom";

export default function UserDetailPage() {
  const { id } = useParams();
  const { userDetail, userProjectList, isLoading, error } = useUserDetail(id);

  return (
    <UserDetail
      userDetail={userDetail}
      userProjectList={userProjectList}
      isLoading={isLoading}
      error={error}
    />
  );
}
