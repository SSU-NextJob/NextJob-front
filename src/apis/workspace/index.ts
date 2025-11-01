import { fetcher } from "..";

export interface WorkspaceDetailResponse {
  success: boolean;
  data: {
    workspaceId: number;
    projectId: number;
    kanban: {
      kanbanId: number;
    };
    drive: {
      driveId: number;
    };
  };
  error: null;
}

export const getWorkspaceDetail = (workspaceId: string) => {
  return fetcher<WorkspaceDetailResponse>(`/workspaces/${workspaceId}`, {
    method: "GET",
  });
};

export interface WorkspaceUser {
  name: string;
  profileImage: string;
  userId: number;
  memberId: number;
}

export interface WorkspaceUsersResponse {
  success: boolean;
  data: WorkspaceUser[];
  error: null;
}

export const getWorkspaceUsers = (workspaceId: string) => {
  return fetcher<WorkspaceUsersResponse>(`/workspaces/${workspaceId}/users`, {
    method: "GET",
  });
};