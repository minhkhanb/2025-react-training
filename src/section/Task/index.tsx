'use client';

import React, { useState } from 'react';
import Filter from './components/Filter';
import Tasks from './components/Tasks';
import UpdateTaskModal from './components/UpdateTaskModal';
import TaskProvider, {
  TaskFilter,
  Task as TaskInterface,
} from '@src/components/Providers/TaskProvider';
import AddTaskModal from './components/AddTaskModal';
import ConfirmDeleteTaskModal from './components/ConfirmDeleteTaskModal';

const Task = () => {
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all-tasks');

  const [currentTask, setCurrentTask] = useState<TaskInterface>();

  const [addTaskVisible, setAddTaskVisible] = useState(false);

  const [updateTaskVisible, setUpdateTaskVisible] = useState(false);

  const [deleteTaskVisible, setDeleteTaskVisible] = useState(false);

  return (
    <TaskProvider>
      <AddTaskModal visible={addTaskVisible} onClose={() => setAddTaskVisible(false)} />

      <UpdateTaskModal
        visible={updateTaskVisible}
        onClose={() => setUpdateTaskVisible(false)}
        currentTask={currentTask}
      />

      <ConfirmDeleteTaskModal
        visible={deleteTaskVisible}
        onClose={() => setDeleteTaskVisible(false)}
        task={currentTask}
      />

      <div className="w-full h-screen p-6 gap-4 flex flex-col">
        <Filter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          onAddTask={() => setAddTaskVisible(true)}
        />
        <Tasks
          currentFilter={currentFilter}
          onDeleteTask={task => {
            setDeleteTaskVisible(true);
            setCurrentTask(task);
          }}
          onUpdateTask={(task: TaskInterface) => {
            setCurrentTask(task);
            setUpdateTaskVisible(true);
          }}
        />
      </div>
    </TaskProvider>
  );
};

export default Task;
