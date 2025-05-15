import { Task, TaskFilter } from '@src/components/Providers/TaskProvider';
import { callApi } from '@src/config/axios/handler';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedData<T> {
  data: T;
  pagination: Pagination;
}

interface TaskData {
  tasks: Task[];
  numberOfCompleted: number;
}

// Fetch all tasks
export const fetchTasks = async (
  currentPage: number,
  currentFilter: TaskFilter
): Promise<PaginatedData<TaskData> | undefined> => {
  return await callApi<PaginatedData<TaskData>>({
    endpoint: `tasks?page=${currentPage}&filter=${currentFilter}`,
    method: 'GET',
  });
};

// Add a new task
export const addTask = async (task: Omit<Task, 'id' | 'isComplete' | 'slug'>) => {
  return await callApi<Task>({ endpoint: `tasks`, method: 'POST', data: task });
};

// Update an existing task
export const updateTask = async (payload: Task) => {
  const { id, ...data } = payload;
  return await callApi<Task>({
    endpoint: `tasks/${id}`,
    method: 'PUT',
    data,
  });
};

// Delete a task
export const deleteTask = async (id: string) => {
  return await callApi<{ message: string }>({
    endpoint: `tasks/${id}`,
    method: 'DELETE',
  });
};

// Get Task by slug
export const getTaskBySlug = async (slug: string) => {
  return await callApi<Task>({
    endpoint: `tasks/get-by-slug/${slug}`,
    method: 'GET',
  });
};
