import { fetcher } from '../index';
import { formatDateTimeForAPI } from '../../utils/normalizedDate';

export interface CreateScheduleRequest {
  workspaceId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  assignees: number[];
  userId: number;
}

export interface CreateScheduleResponse {
  success: boolean;
  data: null;
  error: null;
}

export interface GetSchedulesRequest {
  startDate: string;
  endDate: string;
}

export interface Schedule {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
}

export interface ScheduleDetail {
  scheduleId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  assignees: {
    userId: number;
    name: string;
  }[];
}

export interface GetScheduleDetailResponse {
  success: boolean;
  data: ScheduleDetail;
  error: null;
}

export interface GetSchedulesResponse {
  success: boolean;
  data: Schedule[];
  error: null;
}

export const createSchedule = async (data: CreateScheduleRequest): Promise<CreateScheduleResponse> => {
  return await fetcher('/schedules/insert', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getSchedules = async (data: GetSchedulesRequest): Promise<GetSchedulesResponse> => {
  const params = new URLSearchParams({
    startDate: data.startDate,
    endDate: data.endDate,
  });
  
  return await fetcher(`/schedules?${params.toString()}`, {
    method: 'GET',
  });
};

export const getScheduleDetail = async (scheduleId: number): Promise<GetScheduleDetailResponse> => {
  return await fetcher(`/schedules/${scheduleId}`, {
    method: 'GET',
  });
};

export interface UpdateScheduleRequest {
  scheduleId: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  assignees: number[];
}

export interface UpdateScheduleResponse {
  success: boolean;
  data: null;
  error: null;
}

export const updateSchedule = async (scheduleId: number, data: UpdateScheduleRequest): Promise<UpdateScheduleResponse> => {
  const formattedData = {
    ...data,
    startDate: formatDateTimeForAPI(data.startDate),
    endDate: formatDateTimeForAPI(data.endDate),
  };
  
  return await fetcher(`/schedules/${scheduleId}`, {
    method: 'PUT',
    body: JSON.stringify(formattedData),
  });
};