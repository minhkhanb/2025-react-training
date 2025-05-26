"use client";
import {
  addTask,
  deleteTask,
  fetchTasks,
  PaginatedData,
  Pagination,
  TaskData,
  updateTask,
} from "@/services/taskService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  isComplete: boolean;
}

interface Filter {
  currentStatus: TaskFilter;
  currentLimit: number;
  currentPage: number;
}

export interface TaskContextTypes {
  pagination: Pagination | undefined;
  tasks: Task[];
  isLoading: boolean;
  currentPage: number;
  numberOfCompleted: number;
  currentFilter: TaskFilter;
  currentLimit: number;
  setCurrentLimit: (limit: number) => void;
  setCurrentFilter: (status: TaskFilter) => void;
  setCurrentPage: (page: number) => void;
  handleAddTask: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => void;
  handleUpdateTask: (task: Task) => void;
  handleRemoveTask: (id: string) => void;
}

export type TaskFilter = "all-tasks" | "completed-tasks";

const TaskContext = createContext<TaskContextTypes | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [pagination, setPagination] = useState<Pagination>();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [filter, setFilter] = useState<Filter>({
    currentLimit: 6,
    currentPage: 1,
    currentStatus: "all-tasks",
  });

  const [numberOfCompleted, setNumberOfCompleted] = useState<number>(0);

  const queryClient = useQueryClient();

  // Queries
  const { refetch: fetchPaginationTask, isFetching: isLoading } = useQuery({
    queryKey: [
      "repoData",
      filter.currentPage,
      filter.currentLimit,
      filter.currentStatus,
    ],
    queryFn: async () => await fetchTasks(filter),
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  const getPaginationTask = useCallback(async () => {
    const cacheKey = [
      "repoData",
      filter.currentPage,
      filter.currentLimit,
      filter.currentStatus,
    ];
    const cachedData =
      queryClient.getQueryData<PaginatedData<TaskData>>(cacheKey);
    const paginatedTasks = cachedData ?? (await fetchPaginationTask()).data;
    if (!paginatedTasks) return;
    setTasks(paginatedTasks.data.tasks);
    setPagination(paginatedTasks.pagination);
    setFilter((prev) => ({
      ...prev,
      currentLimit: paginatedTasks.pagination.limit,
      currentPage: paginatedTasks.pagination.page,
    }));
    setNumberOfCompleted(paginatedTasks.data.numberOfCompleted);
  }, [
    filter.currentLimit,
    filter.currentPage,
    filter.currentStatus,
    fetchPaginationTask,
    queryClient,
  ]);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["repoData"] });
    getPaginationTask();
  }, [filter.currentLimit]);

  useEffect(() => {
    getPaginationTask();
  }, [filter.currentPage, filter.currentStatus]);

  const handleAddTask = async (task: { title: string; subtitle: string }) => {
    await addTask(task);
    queryClient.removeQueries({ queryKey: ["repoData"] });
    await getPaginationTask();
  };

  const handleUpdateTask = async (task: Task) => {
    await updateTask(task);
    queryClient.removeQueries({ queryKey: ["repoData", filter.currentPage] });
    getPaginationTask();
  };

  const handleRemoveTask = async (id: string) => {
    await deleteTask(id);
    queryClient.removeQueries({ queryKey: ["repoData"] });
    getPaginationTask();
  };

  return (
    <TaskContext.Provider
      value={{
        currentFilter: filter.currentStatus,
        numberOfCompleted,
        pagination,
        tasks,
        isLoading,
        currentPage: filter.currentPage,
        currentLimit: filter.currentLimit,
        setCurrentLimit: (limit: number) =>
          setFilter((prev) => ({ ...prev, currentLimit: limit })),
        setCurrentFilter: (status: TaskFilter) =>
          setFilter((prev) => ({ ...prev, currentStatus: status })),
        setCurrentPage: (page: number) =>
          setFilter((prev) => ({ ...prev, currentPage: page })),
        handleAddTask,
        handleUpdateTask,
        handleRemoveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export default TaskProvider;
