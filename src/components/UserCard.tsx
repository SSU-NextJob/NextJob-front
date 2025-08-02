import type { UserData } from "@/apis/user";
import { UserCardItem } from "./UserCardItem";

interface UserCardProps {
  users: UserData[];
  isDisableSuggest?: boolean;
}

export const UserCard = ({
  users,
  isDisableSuggest = false,
}: UserCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <UserCardItem
          key={user.userId}
          user={user}
          isDisableSuggest={isDisableSuggest}
        />
      ))}
    </div>
  );
};
