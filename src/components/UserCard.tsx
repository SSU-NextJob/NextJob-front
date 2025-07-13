import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/atoms/Button";
import type { UserData } from "@/apis/user";

// interface Member {
//   userId: number;
//   name: string;
//   role: string;
//   description: string;
//   location: string;
//   skills: string[];
// }

export const UserCard = ({ users }: { users: UserData[] }) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore();

  const handleOpenSuggest = (userId: number) => {
    onOpenModal("suggest", {
      userId,
      // onSubmit: (postId: number) => {
      //   console.log("멤버 ID:", userId, "제안된 모집글 ID:", postId);
      // },
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <div
          key={user.userId}
          className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
        >
          {/* 프로필 섹션 */}
          <div
            className="mb-4"
            onClick={() => navigate(`/user/detail/${user.userId}`)}
          >
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-3" />
            <h2 className="text-lg font-semibold text-gray-900" key={user.name}>
              {user.name}
            </h2>
            <p
              className="text-sm text-gray-700 mb-2 line-clamp-2"
              key={user.email}
            >
              {user.email}
            </p>
            {/* <p className="text-sm text-gray-500 mb-1">{user.role}</p> */}
            {user?.description && (
              <p
                className="text-sm text-gray-700 mb-2 line-clamp-2"
                key={user.description}
              >
                {user.description}
              </p>
            )}
            {/* <p className="text-sm text-gray-500 mb-3">📍 {user.location}</p> */}
            <div className="flex flex-wrap gap-2">
              <p
                className="text-sm text-gray-700 mb-2 line-clamp-2"
                key={user.description}
              >
                분야 : {user.userType}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.techStack && (
                <span
                  key={user.techStack}
                  className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
                >
                  {user.techStack}
                </span>
              )}

              {/* {user.techStack
                ?.split(",")
                .map((s) => s.trim()) // 공백 제거
                .slice(0, 3)
                .map((stack: string) => (
                  <span
                    key={stack}
                    className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
                  >
                    {stack}
                  </span>
                ))} */}
            </div>
          </div>

          {/* 제안 버튼 */}
          <div className="flex justify-end">
            <Button
              onClick={() => handleOpenSuggest(user.userId)}
              color={"blue"}
            >
              제안하기
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
