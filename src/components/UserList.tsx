import { UserListContent } from "./UserListContent";

type UserListProps = {
  userType: string;
  keyword: string;
};

export const UserList = ({ userType, keyword }: UserListProps) => {
  return (
    <UserListContent
      userType={userType}
      keyword={keyword}
    />
  );
};
