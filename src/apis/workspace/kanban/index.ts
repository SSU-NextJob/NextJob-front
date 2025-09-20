import { fetcher } from "../../index";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  DeleteTaskRequest,
  GetTasksRequest,
  GetTaskDetailRequest,
  ChangeTaskColumnRequest,
  ApiResponse,
  TaskListResponse,
  UpdateOrderAndStatusRequest,
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

// 순서/상태 변경 API - PATCH /kanban/tasks/status
export const updateOrderAndStatus = async (
  taskId: number,
  data: UpdateOrderAndStatusRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/kanban/tasks/status/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

// 작업 삭제 API - DELETE /kanban/tasks/:taskId
export const deleteTask = async (
  taskId: number,
  data: DeleteTaskRequest
): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(
    `/kanban/tasks/${taskId}?kanbanId=${data.kanbanId}`,
    {
      method: "DELETE",
    }
  );
};

// 작업 목록 조회 API - GET /kanban/tasks (완)
export const getTasks = async (
  data: GetTasksRequest
): Promise<ApiResponse<TaskListResponse[]>> => {
  return await fetcher<ApiResponse<TaskListResponse[]>>(
    `/kanban/tasks?kanbanId=${data.kanbanId}`,
    {
      method: "GET",
    }
  );
};

// 작업 상세 조회 API - GET /kanban/tasks/:taskId (완)
export const getTaskDetail = async (
  taskId: number,
  data: GetTaskDetailRequest
): Promise<ApiResponse<TaskDetailResponse>> => {
  return await fetcher<ApiResponse<TaskDetailResponse>>(
    `/kanban/tasks/${taskId}?kanbanId=${data.kanbanId}`,
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
