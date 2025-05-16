'use client';
import { itemsPerPageOptions } from '@src/section/Task/components/Pagination';
import { addTask, deleteTask, fetchTasks, Pagination, updateTask } from '@src/services/taskService';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  isComplete: boolean;
}

export interface TaskContextTypes {
  pagination: Pagination | undefined;
  tasks: Task[];
  isLoading: boolean;
  currentPage: number;
  currentLimit: number;
  numberOfCompleted: number;
  currentFilter: TaskFilter;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  isDeleteLoading: boolean;
  getPaginationTask: (
    hasChanged: boolean,
    currentPage: number,
    currentFilter: TaskFilter,
    currentLimit: number
  ) => void;
  handleAddTask: ({ title, subtitle }: { title: string; subtitle: string }) => void;
  handleUpdateTask: (task: Task) => void;
  handleRemoveTask: (id: string) => void;
}

export type TaskFilter = 'all-tasks' | 'completed-tasks';

const TaskContext = createContext<TaskContextTypes | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [pagination, setPagination] = useState<Pagination>();

  const [currentPage, setCurrentPage] = useState(1);

  const [currentLimit, setCurrentLimit] = useState<number>(Number(itemsPerPageOptions[0].value));

  const [cache, setCache] = useState<Record<string, Task[]>>({});

  const [isLoading, setIsLoading] = useState(false);

  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [numberOfCompleted, setNumberOfCompleted] = useState<number>(0);

  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all-tasks');

  const getPaginationTask = async (
    hasChanged: boolean = false,
    page: number,
    filter: TaskFilter,
    limit: number
  ) => {
    const cacheKey = currentPage.toString();

    setCurrentFilter(filter);
    setCurrentLimit(limit);

    if (cache[cacheKey] && !hasChanged) {
      setTasks(cache[cacheKey]);
    } else {
      const paginatedTasks = await fetchTasks(page, filter, limit);
      if (!paginatedTasks) return;
      setTasks(paginatedTasks.data.tasks);
      setPagination(paginatedTasks.pagination);
      setCurrentPage(paginatedTasks.pagination.page);
      setNumberOfCompleted(paginatedTasks.data.numberOfCompleted);
      setCache(prev => ({ ...prev, [currentPage.toString()]: paginatedTasks.data.tasks }));
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      await getPaginationTask(false, currentPage, currentFilter, currentLimit);
      setIsLoading(false);
    };
    loadTasks();
  }, []);

  const handleAddTask = async (task: { title: string; subtitle: string }) => {
    setIsCreateLoading(true);
    const result = await addTask(task);
    if (result) {
      await getPaginationTask(true, currentPage, currentFilter, currentLimit);
    }
    setIsCreateLoading(false);
  };

  const handleUpdateTask = async (task: Task) => {
    setIsUpdateLoading(true);
    const result = await updateTask(task);
    if (result) {
      await getPaginationTask(true, currentPage, currentFilter, currentLimit);
    }
    setIsUpdateLoading(false);
  };

  const handleRemoveTask = async (id: string) => {
    setIsDeleteLoading(true);
    const result = await deleteTask(id);
    if (result) {
      await getPaginationTask(true, currentPage, currentFilter, currentLimit);
    }
    setIsDeleteLoading(false);
  };

  return (
    <TaskContext.Provider
      value={{
        currentFilter,
        numberOfCompleted,
        pagination,
        tasks,
        isLoading,
        currentPage,
        currentLimit,
        isCreateLoading,
        isUpdateLoading,
        isDeleteLoading,
        getPaginationTask,
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
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
};

export default TaskProvider;
