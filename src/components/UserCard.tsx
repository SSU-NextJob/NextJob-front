import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Button } from "@/components/atoms/Button";
import type { UserData } from "@/apis/user";
import { useUserStore } from "@/store/userStore";

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
  const { userId } = useUserStore();

  const handleOpenSuggest = (userId: number) => {
    onOpenModal("suggest", {
      memberId: userId,
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
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={"프로필 이미지"}
                className="h-12 w-12 rounded-full object-cover mb-3"
              />
            ) : (
              <span className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
            )}
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            {/* <p className="text-sm text-gray-500 mb-1">{user.role}</p> */}
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
              {user.description}
            </p>
            {/* <p className="text-sm text-gray-500 mb-3">📍 {user.location}</p> */}
            <div className="flex flex-wrap gap-2">
              <span
                key={user.techStack}
                className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
              >
                {user.techStack}
              </span>
              {/* {user.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-full">
                  +{user.skills.length - 3}
                </span>
              )} */}
            </div>
          </div>

          {/* 제안 버튼 */}
          <div className="flex justify-end">
            {userId !== user.userId && (
              <Button
                onClick={() => handleOpenSuggest(user.userId)}
                color={"blue"}
              >
                제안하기
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
