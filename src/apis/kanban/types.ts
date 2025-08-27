export interface KanbanTask {
  taskId: number;
  subject: string;
  content: string;
  userId: number;
  kanbanId: number;
  columnId: number;
  startDate: string;
  endDate: string;
  users: number[];
  importance: 'Y' | 'N';
  sort: number;
}

export interface CreateTaskRequest {
  subject: string;
  content: string;
  userId: number;
  kanbanId: number;
  columnId: number;
  startDate: string;
  endDate: string;
  users: number[];
  importance: 'Y' | 'N';
  sort: number;
}

export interface UpdateTaskRequest {
  taskId: number;
  name: string;
  content: string;
  columnId: number;
  startDate: string;
  endDate: string;
  users: number[];
  importance: 'Y' | 'N';
}

export interface DeleteTaskRequest {
  kanbanId: number;
}

export interface GetTasksRequest {
  kanbanId: number;
}

export interface GetTaskDetailRequest {
  kanbanId: number;
}

export interface ChangeTaskColumnRequest {
  taskId: number;
  columnId: number;
}

export interface TaskListResponse {
  columnId: number;
  taskId: number;
  startDate: string;
  endDate: string;
}

export interface TaskDetailResponse {
  columnId: number;
  taskId: number;
  subject: string;
  content: string;
  importance: boolean;
  startDate: string;
  endDate: string;
  sort: number;
  users: number[] | null;
}

export interface ApiResponse<T = null> {
  success: boolean;
  data: T;
  error: string | null;
}