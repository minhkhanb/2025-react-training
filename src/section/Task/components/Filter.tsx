import { useTask } from '@src/components/Providers/TaskProvider';
import React from 'react';

interface Props {
  currentFilter: 'all-tasks' | 'completed-tasks';
  setCurrentFilter: React.Dispatch<React.SetStateAction<'all-tasks' | 'completed-tasks'>>;
  onAddTask: () => void;
}

const Filter = ({ currentFilter, setCurrentFilter, onAddTask }: Props) => {
  const { tasks } = useTask();

  return (
    <div className="w-full flex items-center justify-between">
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
            {tasks.length}
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
            {tasks.filter(item => item.isCompleted).length}
          </p>
        </button>
      </div>
      <button
        onClick={onAddTask}
        className="text-sm font-medium text-white cursor-pointer bg-blue-300 px-4 py-2 rounded-md"
      >
        Add New
      </button>
    </div>
  );
};

export default Filter;
