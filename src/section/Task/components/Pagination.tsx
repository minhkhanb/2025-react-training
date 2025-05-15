import { useTask } from '@src/components/Providers/TaskProvider';
import { cn } from '@src/utils/cn';
import React from 'react';

const Pagination = () => {
  const { pagination, setCurrentPage, currentPage, isLoading } = useTask();

  if (!pagination || isLoading) return;

  return (
    <div className="w-full flex items-center justify-end gap-4">
      {pagination.hasPreviousPage && (
        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="cursor-pointer fa-solid fa-chevron-left"
        />
      )}
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
      {pagination.hasNextPage && (
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="cursor-pointer fa-solid fa-chevron-right"
        />
      )}
    </div>
  );
};

export default Pagination;
