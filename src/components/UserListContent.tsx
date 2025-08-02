import { Loading } from "@/components/atoms/Loading";
import { UserCard } from "@/components/UserCard";
import type { UserData } from "@/apis/user";

interface UserListContentProps {
  users: UserData[];
  isLoading: boolean;
  error: string | null;
}

export const UserListContent = ({ users, isLoading, error }: UserListContentProps) => {
  if (isLoading) return <Loading />;
  
  if (error) return <div className="text-red-500">{error}</div>;
  
  if (users.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
        <svg
          className="w-16 h-16 mb-4 text-blue-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <div className="text-lg font-semibold">찾으시는 팀원이 없습니다!</div>
      </div>
    );
  }

  return <UserCard users={users} />;
}; 