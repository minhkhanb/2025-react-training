'use client';

import React from 'react';

type SummaryProps = {
  children?: {
    totalTodos?: number;
    totalFinishTodos?: number;
    isFetching?: boolean;
  };
};

export const Summary = ({ children }: SummaryProps) => {
  const { totalTodos, totalFinishTodos, isFetching } = children || {};

  if (isFetching) {
    return (
      <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between bg-gray-50 p-4 text-sm text-gray-600">
      <span>Total: {totalTodos} tasks</span>

      <span>Completed: {totalFinishTodos}</span>
    </div>
  );
};
