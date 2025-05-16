import { useTask } from '@src/components/Providers/TaskProvider';
import React from 'react';

const Filter = () => {
  const { pagination, numberOfCompleted, currentFilter, setCurrentFilter } = useTask();

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={() => setCurrentFilter('all-tasks')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <p
          style={{ color: currentFilter === 'all-tasks' ? 'blue' : '#999' }}
          className="transition-all duration-500 text-sm"
        >
          All Tasks
        </p>
        <p
          style={{ backgroundColor: currentFilter === 'all-tasks' ? 'blue' : '#999' }}
          className="text-[12px] transition-all duration-500 flex items-center justify-center aspect-square rounded-full bg-blue-500 text-white w-5"
        >
          {pagination?.total || 0}
        </p>
      </button>
      <button
        onClick={() => setCurrentFilter('completed-tasks')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <p
          style={{ color: currentFilter === 'completed-tasks' ? 'blue' : '#999' }}
          className="transition-all duration-500 text-sm"
        >
          Completed Tasks
        </p>
        <p
          style={{ backgroundColor: currentFilter === 'completed-tasks' ? 'blue' : '#999' }}
          className="text-[12px] transition-all duration-500 flex items-center justify-center aspect-square rounded-full bg-blue-500 text-white w-5"
        >
          {numberOfCompleted}
        </p>
      </button>
    </div>
  );
};

export default Filter;
