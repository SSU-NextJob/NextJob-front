import { fetcher } from '../index';
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  DeleteTaskRequest,
  GetTasksRequest,
  GetTaskDetailRequest,
  ChangeTaskColumnRequest,
  ApiResponse,
  TaskListResponse,
  TaskDetailResponse,
} from './types';

export const createTask = async (data: CreateTaskRequest): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>('/kanban/tasks/insert', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateTask = async (taskId: number, data: UpdateTaskRequest): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/kanban/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteTask = async (taskId: number, data: DeleteTaskRequest): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>(`/kanban/tasks/${taskId}`, {
    method: 'DELETE',
    body: JSON.stringify(data),
  });
};

export const getTasks = async (data: GetTasksRequest): Promise<ApiResponse<TaskListResponse[]>> => {
  return await fetcher<ApiResponse<TaskListResponse[]>>('/kanban/tasks', {
    method: 'GET',
    body: JSON.stringify(data),
  });
};

export const getTaskDetail = async (
  taskId: number, 
  data: GetTaskDetailRequest
): Promise<ApiResponse<TaskDetailResponse>> => {
  return await fetcher<ApiResponse<TaskDetailResponse>>(`/kanban/tasks/${taskId}`, {
    method: 'GET',
    body: JSON.stringify(data),
  });
};

export const changeTaskColumn = async (data: ChangeTaskColumnRequest): Promise<ApiResponse> => {
  return await fetcher<ApiResponse>('/kanban/tasks/column', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};