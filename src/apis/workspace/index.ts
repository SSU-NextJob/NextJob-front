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