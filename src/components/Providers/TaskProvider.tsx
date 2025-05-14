'use client';
import { addTask, deleteTask, fetchTasks, Pagination, updateTask } from '@src/services/taskService';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

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
  numberOfCompleted: number;
  currentFilter: TaskFilter;
  setCurrentFilter: React.Dispatch<React.SetStateAction<TaskFilter>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleAddTask: ({ title, subtitle }: { title: string; subtitle: string }) => void;
  handleUpdateTask: (task: Task) => void;
  handleRemoveTask: (id: string) => void;
}

export type TaskFilter = 'all-tasks' | 'completed-tasks';

const TaskContext = createContext<TaskContextTypes | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [pagination, setPagination] = useState<Pagination>();

  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [numberOfCompleted, setNumberOfCompleted] = useState<number>(0);

  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all-tasks');

  const getPaginationTask = useCallback(async () => {
    const paginatedTasks = await fetchTasks(currentPage, currentFilter);
    if (!paginatedTasks) return;
    setTasks(paginatedTasks.data.tasks);
    setPagination(paginatedTasks.pagination);
    setCurrentPage(paginatedTasks.pagination.page);
    setNumberOfCompleted(paginatedTasks.data.numberOfCompleted);
  }, [currentPage, currentFilter]);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      await getPaginationTask();
      setIsLoading(false);
    };
    loadTasks();
  }, [currentPage, currentFilter]);

  const handleAddTask = async (task: { title: string; subtitle: string }) => {
    await addTask(task);
    await getPaginationTask();
  };

  const handleUpdateTask = async (task: Task) => {
    await updateTask(task);
    await getPaginationTask();
  };

  const handleRemoveTask = async (id: string) => {
    await deleteTask(id);
    await getPaginationTask();
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
        setCurrentFilter,
        setCurrentPage,
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
