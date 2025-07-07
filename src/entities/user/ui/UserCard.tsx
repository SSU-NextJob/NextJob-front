import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/shared/store/modalStore";
import { Button } from "@/shared/ui/atoms/Button";

interface Member {
  id: number;
  name: string;
  role: string;
  description: string;
  location: string;
  skills: string[];
}

export const UserCard = ({ members }: { members: Member[] }) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore();

  const handleSuggest = (memberId: number) => {
    onOpenModal("suggest", {
      memberId,
      onSubmit: (postId: number) => {
        console.log("멤버 ID:", memberId, "제안된 모집글 ID:", postId);
      },
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {members.map((member) => (
        <div
          key={member.id}
          className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
        >
          {/* 프로필 섹션 */}
          <div
            className="mb-4"
            onClick={() => navigate(`/user/detail/${member.id}`)}
          >
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-3" />
            <h2 className="text-lg font-semibold text-gray-900">
              {member.name}
            </h2>
            <p className="text-sm text-gray-500 mb-1">{member.role}</p>
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
              {member.description}
            </p>
            <p className="text-sm text-gray-500 mb-3">📍 {member.location}</p>
            <div className="flex flex-wrap gap-2">
              {member.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {member.skills.length > 3 && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-full">
                  +{member.skills.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* 제안 버튼 */}
          <div className="flex justify-end">
            <Button onClick={() => handleSuggest(member.id)} color={"blue"}>
              제안하기
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
