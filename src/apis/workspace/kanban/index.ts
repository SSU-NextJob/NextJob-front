import { fetcher } from "../../index";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  ChangeTaskColumnRequest,
  ApiResponse,
  TaskListResponse,
  TaskDetailResponse,
  ColumnResponse,
} from "./types";

// 작업 생성 API - POST /kanban/tasks/insert (완)
export const createTask = async (
  data: CreateTaskRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>("/kanban/tasks/insert", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// 작업 수정 API - PUT /kanban/tasks/:taskId (완)
export const updateTask = async (
  taskId: number,
  data: UpdateTaskRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/kanban/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// 작업 삭제 API - DELETE /kanban/tasks/:taskId
export const deleteTask = async (taskId: number): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/kanban/tasks/${taskId}`, {
    method: "DELETE",
  });
};

// 작업 목록 조회 API - GET /kanban/tasks (완)
export const getTasks = async (
  kanbanId: number
): Promise<ApiResponse<TaskListResponse[]>> => {
  return await fetcher<ApiResponse<TaskListResponse[]>>(
    `/kanban/tasks?kanbanId=${kanbanId}`,
    {
      method: "GET",
    }
  );
};

// 작업 상세 조회 API - GET /kanban/tasks/:taskId (완)
export const getTaskDetail = async (
  taskId: number,
  kanbanId: number
): Promise<ApiResponse<TaskDetailResponse>> => {
  return await fetcher<ApiResponse<TaskDetailResponse>>(
    `/kanban/tasks/${taskId}?kanbanId=${kanbanId}`,
    {
      method: "GET",
    }
  );
};

// 컬럼 조회 API - GET /kanban/columns
export const getColumns = async (
  kanbanId: number
): Promise<ApiResponse<ColumnResponse[]>> => {
  return await fetcher<ApiResponse<ColumnResponse[]>>(
    `/kanban/columns?kanbanId=${kanbanId}`,
    {
      method: "GET",
    }
  );
};

// 작업 컬럼 변경 API - PATCH /kanban/tasks/column
export const changeTaskColumn = async (
  data: ChangeTaskColumnRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>("/kanban/tasks/column", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
