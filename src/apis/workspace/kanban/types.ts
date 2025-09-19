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
  importance: "Y" | "N";
  sort: number;
}

export interface CreateTaskRequest {
  subject: string;
  content: string;
  userId: number;
  kanbanId: number;
  columnId: number;
  users: number[];
  startDate: string;
  endDate: string;
  importance: "Y" | "N";
  sort: number;
}

export interface UpdateTaskRequest {
  taskId: number;
  kanbanId: number;
  columnId: number;
  subject: string;
  users: number[];
  content: string;
  name: string;
  startDate: string;
  endDate: string;
  importance: "Y" | "N";
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
  subject: string;
  importance: boolean;
  startDate: string;
  endDate: string;
  sort: number;
}

export interface TaskUser {
  userId: number;
  name: string;
  profileImage: string;
}

export interface TaskDetailResponse {
  columnId: number;
  taskId: number;
  subject: string;
  content: string;
  importance: boolean;
  startDate: string;
  endDate: string;
  users: TaskUser[];
}

export interface ColumnResponse {
  columnId: number;
  name: string;
  sort: number;
}

export interface ApiResponse<T = null> {
  success: boolean;
  data: T;
  error: string | null;
}
