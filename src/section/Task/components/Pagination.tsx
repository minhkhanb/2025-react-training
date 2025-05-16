import { useTask } from '@src/components/Providers/TaskProvider';
import Select, { Option } from '@src/components/ui/Select';
import { cn } from '@src/utils/cn';
import React from 'react';

export const itemsPerPageOptions: Option[] = [
  {
    label: '2',
    value: '2',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '8',
    value: '8',
  },
];

const Pagination = () => {
  const { pagination, getPaginationTask, currentPage, isLoading, currentFilter, currentLimit } =
    useTask();

  if (!pagination || isLoading || pagination.total === 0) return;

  return (
    <div className="w-full flex items-center justify-end gap-4">
      <Select
        onChange={e => {
          getPaginationTask(true, currentPage, currentFilter, Number(e.target.value));
        }}
        className="w-[50px]"
        options={itemsPerPageOptions}
      />
      <button
        onClick={() => getPaginationTask(true, currentPage - 1, currentFilter, currentLimit)}
        className={cn(
          'cursor-pointer fa-solid transition-all duration-500 fa-chevron-left text-gray-300',
          pagination.hasPreviousPage && 'text-gray-500'
        )}
      />
      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((_, index) => (
        <button
          key={index}
          onClick={() => getPaginationTask(true, index + 1, currentFilter, currentLimit)}
          className={cn(
            'text-black font-thin transition-all duration-500 cursor-pointer text-sm w-8 flex items-center justify-center rounded-full aspect-square',
            currentPage === index + 1 && 'bg-blue-400 text-white'
          )}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => getPaginationTask(true, currentPage + 1, currentFilter, currentLimit)}
        className={cn(
          'cursor-pointer fa-solid transition-all duration-500 fa-chevron-right text-gray-300',
          pagination.hasNextPage && 'text-gray-500'
        )}
      />
    </div>
  );
};

export default Pagination;
