import { UserData, UserProjectData } from "@/apis/user/index";
import { UserDetailCard } from "@/components/UserDetailCard";

export const UserDetail = ({
  user,
  userProject,
}: {
  user: UserData;
  userProject: UserProjectData;
}) => {
  return <UserDetailCard user={user} userProject={userProject} />;
};
