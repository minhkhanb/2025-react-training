import { Task as TaskInterface, useTask } from '@src/components/Providers/TaskProvider';
import Task from '@src/components/Task';
import React from 'react';

interface Props {
  onUpdateTask: (task: TaskInterface) => void;
  onDeleteTask: (task: TaskInterface) => void;
}

const Tasks = ({ onUpdateTask, onDeleteTask }: Props) => {
  const { tasks } = useTask();

  return (
    <div className="w-full overflow-hidden pb-4 grid grid-cols-4 gap-2">
      {tasks.map(task => (
        <Task onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} task={task} key={task.id} />
      ))}
    </div>
  );
};

export default Tasks;
