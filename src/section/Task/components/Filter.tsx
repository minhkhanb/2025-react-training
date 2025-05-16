import { useTask } from '@src/components/Providers/TaskProvider';
import { cn } from '@src/utils/cn';
import React from 'react';

const Filter = () => {
  const { pagination, numberOfCompleted, currentFilter, getPaginationTask, currentPage } =
    useTask();

  const filters = {
    'all-tasks': 86.93,
    'completed-tasks': 149.63,
  };

  const leftOffset = currentFilter === 'completed-tasks' ? filters['all-tasks'] + 24 : 0;

  return (
    <div className="flex items-center gap-6 relative">
      <button
        onClick={() => getPaginationTask(true, currentPage, 'all-tasks')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <p
          className={cn(
            'transition-all duration-500 text-sm',
            currentFilter === 'all-tasks' ? 'text-blue-400' : 'text-gray-400'
          )}
        >
          All Tasks
        </p>
        <p
          className={cn(
            'text-[12px] transition-all duration-500 flex items-center justify-center aspect-square rounded-full bg-blue-500 text-white w-5',
            currentFilter === 'all-tasks' ? 'bg-blue-400' : 'bg-gray-400'
          )}
        >
          {pagination?.total || 0}
        </p>
      </button>
      <button
        onClick={() => getPaginationTask(true, currentPage, 'completed-tasks')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <p
          className={cn(
            'transition-all duration-500 text-sm',
            currentFilter === 'completed-tasks' ? 'text-blue-400' : 'text-gray-400'
          )}
        >
          Completed Tasks
        </p>
        <p
          className={cn(
            'text-[12px] transition-all duration-500 flex items-center justify-center aspect-square rounded-full bg-blue-500 text-white w-5',
            currentFilter === 'completed-tasks' ? 'bg-blue-400' : 'bg-gray-400'
          )}
        >
          {numberOfCompleted}
        </p>
      </button>
      <div
        className="absolute -bottom-2 h-[2px] bg-blue-300 transition-all duration-500"
        style={{
          width: `${filters[currentFilter]}px`,
          left: `${leftOffset}px`,
        }}
      />
    </div>
  );
};

export default Filter;
