'use client';

import React, { useState } from 'react';
import Filter from './components/Filter';
import Tasks from './components/Tasks';
import UpdateTaskModal from './components/UpdateTaskModal';
import TaskProvider, { Task as TaskInterface } from '@src/components/Providers/TaskProvider';
import AddTaskModal from './components/AddTaskModal';
import ConfirmDeleteTaskModal from './components/ConfirmDeleteTaskModal';
import Pagination from './components/Pagination';

const Task = () => {
  const [currentTask, setCurrentTask] = useState<TaskInterface>();

  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const [updateTaskVisible, setUpdateTaskVisible] = useState(false);

  const [deleteTaskVisible, setDeleteTaskVisible] = useState(false);

  return (
    <TaskProvider>
      <AddTaskModal visible={addTaskVisible} onClose={() => setAddTaskVisible(false)} />

      <UpdateTaskModal
        visible={updateTaskVisible}
        onClose={() => {
          setCurrentTask(undefined);
          setUpdateTaskVisible(false);
        }}
        currentTask={currentTask}
      />

      <ConfirmDeleteTaskModal
        visible={deleteTaskVisible}
        onClose={() => {
          setDeleteTaskVisible(false);
          setCurrentTask(undefined);
        }}
        task={currentTask}
      />

      <div className="w-full min-h-screen p-6 gap-2 flex flex-col">
        <div className="w-full flex items-center justify-between">
          <Filter />
          <button
            onClick={() => setAddTaskVisible(true)}
            className="text-sm font-medium text-white cursor-pointer bg-blue-300 px-4 py-2 rounded-md"
          >
            Add New
          </button>
        </div>
        <Tasks
          currentTask={currentTask}
          onDeleteTask={task => {
            setDeleteTaskVisible(true);
            setCurrentTask(task);
          }}
          onUpdateTask={(task: TaskInterface) => {
            setCurrentTask(task);
            setUpdateTaskVisible(true);
          }}
        />
        <Pagination />
      </div>
    </TaskProvider>
  );
};

export default Task;
