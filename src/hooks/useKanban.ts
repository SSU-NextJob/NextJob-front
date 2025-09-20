import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskDetail,
  changeTaskColumn,
} from "@/apis/workspace/kanban";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  DeleteTaskRequest,
  GetTasksRequest,
  GetTaskDetailRequest,
  ChangeTaskColumnRequest,
} from "@/apis/workspace/kanban/types";

const KANBAN_QUERY_KEYS = {
  tasks: (kanbanId: number) => ["kanban", "tasks", kanbanId] as const,
  taskDetail: (taskId: number, kanbanId: number) =>
    ["kanban", "task", taskId, kanbanId] as const,
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskRequest) => createTask(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: KANBAN_QUERY_KEYS.tasks(variables.kanbanId),
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: number;
      data: UpdateTaskRequest;
    }) => updateTask(taskId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: KANBAN_QUERY_KEYS.tasks(variables.data.taskId),
      });
      queryClient.invalidateQueries({
        queryKey: KANBAN_QUERY_KEYS.taskDetail(
          variables.taskId,
          variables.data.taskId
        ),
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: number;
      data: DeleteTaskRequest;
    }) => deleteTask(taskId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: KANBAN_QUERY_KEYS.tasks(variables.data.kanbanId),
      });
      queryClient.removeQueries({
        queryKey: KANBAN_QUERY_KEYS.taskDetail(
          variables.taskId,
          variables.data.kanbanId
        ),
      });
    },
  });
};

export const useTasks = (data: GetTasksRequest, enabled = true) => {
  return useQuery({
    queryKey: KANBAN_QUERY_KEYS.tasks(data.kanbanId),
    queryFn: () => getTasks(data),
    enabled,
  });
};

export const useTaskDetail = (
  taskId: number,
  data: GetTaskDetailRequest,
  enabled = true
) => {
  return useQuery({
    queryKey: KANBAN_QUERY_KEYS.taskDetail(taskId, data.kanbanId),
    queryFn: () => getTaskDetail(taskId, data),
    enabled: enabled && !!taskId,
  });
};

export const useChangeTaskColumn = (kanbanId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangeTaskColumnRequest) => changeTaskColumn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KANBAN_QUERY_KEYS.tasks(kanbanId),
      });
    },
  });
};
