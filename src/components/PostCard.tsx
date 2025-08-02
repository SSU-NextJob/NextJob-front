import type { PostResponse } from "@/apis/post";
import { PostCardItem } from "./PostCardItem";

interface PostCardProps {
  posts: PostResponse[];
}

export const PostCard = ({ posts }: PostCardProps) => {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <PostCardItem key={post.postId} post={post} />
      ))}
    </div>
  );
};
