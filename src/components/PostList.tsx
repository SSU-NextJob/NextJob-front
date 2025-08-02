import { Loading } from "@/components/atoms/Loading";
import { PostCard } from "@/components/PostCard";
import type { PostResponse } from "@/apis/post";

interface PostListProps {
  posts: PostResponse[];
  isLoading: boolean;
  error: string | null;
}

export const PostList = ({ posts, isLoading, error }: PostListProps) => {
  if (isLoading) return <Loading />;

  if (error) return <div className="text-red-500">{error}</div>;

  if (posts.length === 0) {
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
        <div className="text-lg font-semibold">
          찾으시는 프로젝트가 없습니다!
        </div>
      </div>
    );
  }

  return <PostCard posts={posts} />;
};
