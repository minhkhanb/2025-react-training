import { useTask } from '@src/components/Providers/TaskProvider';
import { cn } from '@src/utils/cn';
import React from 'react';

const Pagination = () => {
  const { pagination, setCurrentPage, currentPage, isLoading } = useTask();

  if (!pagination || isLoading) return;

  return (
    <div className="w-full flex items-center justify-end gap-4">
      <button
        onClick={() => setCurrentPage(prev => prev - 1)}
        className={cn(
          'cursor-pointer fa-solid transition-all duration-500 fa-chevron-left text-gray-300',
          pagination.hasPreviousPage && 'text-gray-500'
        )}
      />
      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={cn(
            'text-black font-thin transition-all duration-500 cursor-pointer text-sm w-8 flex items-center justify-center rounded-full aspect-square',
            currentPage === index + 1 && 'bg-blue-400 text-white'
          )}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(prev => prev + 1)}
        className={cn(
          'cursor-pointer fa-solid transition-all duration-500 fa-chevron-right text-gray-300',
          pagination.hasNextPage && 'text-gray-500'
        )}
      />
    </div>
  );
};

export default Pagination;
