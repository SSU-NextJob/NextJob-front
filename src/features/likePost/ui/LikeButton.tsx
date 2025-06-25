import { Button } from "@/shared/ui/modules/Button";

export const LikeButton = ({ liked }: { liked: boolean }) => (
  <Button>{liked ? "Liked" : "Like"}</Button>
);
