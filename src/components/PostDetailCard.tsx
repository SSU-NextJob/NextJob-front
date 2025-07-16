import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import type { PostResponse } from "@/apis/post";
import normalizedDate from "@/utils/normalizedDate";
import { useUserStore } from "@/store/userStore";

export const PostDetailCard = ({ post }: { post?: PostResponse }) => {
  const navigate = useNavigate();
  const { onOpenModal } = useModalStore();
  const { userId } = useUserStore();

  const handleOpenApplyModal = (post: PostResponse) => {
    onOpenModal("apply", {
      projectId: post.postId,
      onApply: () => {
        /* ... */
      },
    });
  };

  if (!post) return;
  return (
    <>
      <div className="w-full bg-white text-gray-800 p-10">
        {/* 뒤로가기 */}
        <div className="mb-6 flex justify-start">
          <Button onClick={() => navigate(-1)} color={"white"}>
            ← 뒤로가기
          </Button>
        </div>

        {/* 전체 레이아웃 */}
        <div className="w-full text-left">
          {/* 제목 + 타입 */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{post.project.name}</h1>
            <Badge type={post.project.type} />
          </div>

          {/* 메타 정보 */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <span>📅 시작일: {normalizedDate(post.project.startAt)}</span>
            <span>📅 마감일: {normalizedDate(post.project.endAt)}</span>
            {/* <span>📍 위치: {project.location}</span> */}
            {/* <span>👥 모집인원: 1명</span> */}
          </div>

          <div className="mb-6">
            <img src={post.project.image} />
          </div>

          {/* 설명 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">포지션 상세</h2>
            <p className="text-sm text-gray-700">{post.content}</p>
          </div>

          {/* 필요한 역할 */}
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">필요한 역할</h2>
            <div className="flex flex-wrap gap-2">
              {/* <p className="text-sm text-gray-700">{post.project.type}</p> */}
              <p className="text-sm text-gray-700">{post.roleType}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">주요 업무</h2>
            <p className="text-sm text-gray-700">{post.project.content}</p>
          </div>

          {/* 기술 역량 */}
          {/* <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">기술 역량</h2>
            <div className="flex flex-wrap gap-2">
              <p className="text-sm text-gray-700">{project.techStack}</p>
            </div>
          </div> */}

          {/* 요구사항 */}
          {/* <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">요구사항</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {project.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div> */}

          {/* 혜택 */}
          {/* <div className="mb-6">
            <h2 className="text-base font-semibold mb-1">혜택</h2>
            <div className="flex flex-wrap gap-2">
              {project.benefits.map((b) => (
                <span
                  key={b}
                  className="bg-green-100 text-green-800 text-xs px-4 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div> */}

          {/* 방장 */}
          {/* <div className="text-sm text-gray-600 mb-6">
            <div className="font-semibold text-gray-800">방장</div>
            {project.creator}
          </div> */}

          {/* 참가 버튼 */}
          <div className="flex justify-end">
            {userId !== post.userId && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenApplyModal(post);
                }}
                color={"blue"}
              >
                참가하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
