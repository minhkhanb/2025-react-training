'use client';
import { taskList } from '@src/mocks/tasks';
import React, { createContext, useContext, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
}

export interface TaskContextTypes {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: string) => void;
  toggleCompletion: (id: string) => void;
}

export type TaskFilter = 'all-tasks' | 'completed-tasks';

const TaskContext = createContext<TaskContextTypes | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(taskList);

  const addTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const updateTask = (task: Task) => {
    setTasks(prev =>
      prev.map(item => {
        if (item.id === task.id) {
          return task;
        }
        return item;
      })
    );
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(item => item.id !== id));
  };

  const toggleCompletion = (id: string) => {
    setTasks(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      })
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, toggleCompletion }}>
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
