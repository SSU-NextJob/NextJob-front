import { Button } from "@/shared/ui/atoms/Button";

export const LikeButton = ({ liked }: { liked: boolean }) => (
  <Button>{liked ? "Liked" : "Like"}</Button>
);
