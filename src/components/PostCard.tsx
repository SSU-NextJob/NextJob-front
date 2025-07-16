import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store/modalStore";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import type { PostResponse } from "@/apis/post";
import normalizedDate from "@/utils/normalizedDate";
import { useUserStore } from "@/store/userStore";

export const PostCard = ({ posts }: { posts: PostResponse[] }) => {
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
    <>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => {
          return (
            <div
              key={post.postId}
              onClick={() => navigate(`/post/detail/${post.postId}`)}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                <Badge type={post.project.projectType} />
                <span>{normalizedDate(post.project.startAt)}</span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {post.title}
              </h2>

              {/* <p className="text-sm text-gray-600 mb-4">{post.summary}</p>

              <div className="text-xs font-medium text-gray-500 mb-1">
                모집요강
              </div>
              <p className="text-sm text-gray-700 mb-4">
                {post.recruitmentSummary}
              </p> */}

              <div className="text-xs font-medium text-gray-500 mb-1">
                필요한 역할
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  key={post.roleType}
                  className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-800"
                >
                  {post.roleType}
                </span>
                {/* {post.rolesNeeded.slice(0, 2).map((role) => (
                  <span
                    key={role}
                    className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-800"
                  >
                    {role}
                  </span>
                ))}
                {post.rolesNeeded.length > 2 && (
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded-full text-gray-700">
                    +{post.rolesNeeded.length - 2}
                  </span>
                )} */}
              </div>

              {/* <div className="text-xs font-medium text-gray-500 mb-1">
                기술 역량
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  key={post.techStack}
                  className="bg-gray-100 text-sm text-gray-800 px-2 py-1 rounded-md"
                >
                  {post.techStack}
                </span>
              </div> */}

              <div className="flex items-center justify-between mt-auto">
                <div className="text-sm text-gray-600 flex flex-col gap-1">
                  <div>🕒 ~ {normalizedDate(post.project.endAt)}</div>
                  {/* <div>
                    👥 ({post.participatingCount}/{post.recruitingCount}) 인원
                  </div> */}
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
        })}
      </div>
    </>
  );
};
