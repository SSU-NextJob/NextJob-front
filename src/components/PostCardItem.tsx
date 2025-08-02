import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import type { PostResponse } from "@/apis/post";
import normalizedDate from "@/utils/normalizedDate";
import { useUserStore } from "@/store/userStore";

interface PostCardItemProps {
  post: PostResponse;
}

export const PostCardItem = ({ post }: PostCardItemProps) => {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { onOpenModal } = useModalStore();

  const handleOpenApplyModal = (post: PostResponse) => {
    if (post.userId === userId) return;
    onOpenModal("apply", {
      projectId: post.project.projectId,
      onApply: () => {
        /* ... */
      },
    });
  };

  return (
    <div
      onClick={() => navigate(`/post/detail/${post.postId}`)}
      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col"
    >
      <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
        <Badge type={post.project.type} />
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          {normalizedDate(post.project.startAt)}
        </span>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-1">{post.title}</h2>

      <div className="text-xs font-medium text-gray-500 mb-1">필요한 역할</div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          key={post.roleType}
          className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-800"
        >
          {post.roleType}
        </span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="text-sm text-gray-600 flex flex-col gap-1">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            ~ {normalizedDate(post.project.endAt)}
          </div>
        </div>

        {userId && userId !== post.userId && (
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
  );
};
