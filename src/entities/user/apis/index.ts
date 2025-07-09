import { useQuery } from "@tanstack/react-query";
import { getUser, getProject } from "./queryFn";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    staleTime: 1000 * 60, // 1분 캐싱
    enabled: !!userId, // userId가 존재할 때만 실행
  });
};

export const useGetProject = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    staleTime: 1000 * 60, // 1분 동안 fresh
  });
};
