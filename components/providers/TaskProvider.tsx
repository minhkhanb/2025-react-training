"use client";

import React, { createContext, useContext, useState } from "react";

export type TaskLevel = "hard" | "medium" | "easy";

export type TaskFilter = "all-tasks" | "completed-tasks";

export interface Task {
  id: string;
  title: string;
  level: TaskLevel;
  subtitle: string;
  isComplete: boolean;
}

export interface TaskContextTypes {
  limit: number;
  page: number;
  filter: TaskFilter;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFilter: React.Dispatch<React.SetStateAction<TaskFilter>>;
}

const TaskContext = createContext<TaskContextTypes | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [limit, setLimit] = useState(6);

  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState<TaskFilter>("all-tasks");

  return (
    <TaskContext.Provider
      value={{
        limit,
        page,
        filter,
        setLimit,
        setPage,
        setFilter,
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
