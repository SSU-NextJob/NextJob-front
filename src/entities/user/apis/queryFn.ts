import { fetcher } from "@/shared/apis";

export const getUser = (userId: string) => {
  return fetcher<{ id: string; name: string; email: string }>(
    `/api/users/${userId}`
  );
};

export const getProject = (projectId: string) => {
  return fetcher(`/api/projects/${projectId}`);
};
