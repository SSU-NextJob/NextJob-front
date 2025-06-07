import { LikeButton } from "@/features/likePost/ui/LikeButton";
import { PostTitle } from "@/entities/post/ui/PostTitle";

export const PostCard = ({ title }: { title: string }) => (
  <div>
    <PostTitle title={title} />
    <LikeButton liked={false} />
  </div>
);
