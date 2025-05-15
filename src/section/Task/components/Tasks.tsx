import Empty from '@src/components/Empty';
import Loading from '@src/components/Loading';
import { Task as TaskInterface, useTask } from '@src/components/Providers/TaskProvider';
import Task from '@src/components/Task';
import { cn } from '@src/utils/cn';
import React from 'react';

interface Props {
  onUpdateTask: (task: TaskInterface) => void;
  onDeleteTask: (task: TaskInterface) => void;
}

const Tasks = ({ onUpdateTask, onDeleteTask }: Props) => {
  const { tasks, currentFilter, isLoading } = useTask();

  const title = {
    'all-tasks': 'Not Found Tasks',
    'completed-tasks': 'Not Found Completed Tasks',
  };

  const subtitle = {
    'all-tasks': "Let's create new task now!!!",
    'completed-tasks': "Let's complete task now!!!",
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden pb-4',
        tasks.length > 0 && !isLoading
          ? 'grid grid-cols-4 gap-2'
          : 'flex items-center justify-center h-[400px]'
      )}
    >
      {isLoading ? (
        <Loading />
      ) : tasks.length === 0 ? (
        <Empty title={title[currentFilter]} subtitle={subtitle[currentFilter]} />
      ) : (
        tasks.map(task => (
          <Task onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} task={task} key={task.id} />
        ))
      )}
    </div>
  );
};

export default Tasks;
