'use client';

import React, { useMemo } from 'react';
import { PaginationProps } from './types/IPagination';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { getVisiblePages } from './utils/getVisiblePages';

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [itemsPerPage, totalItems]
  );

  const visiblePages = useMemo(() => {
    return getVisiblePages(currentPage, totalPages);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer rounded px-3 py-1 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
      >
        <LeftOutlined className="text-sm" />
      </button>

      {visiblePages.map((page, index) =>
        page === 'LEFT_ELLIPSIS' ? (
          <button
            key={`left-ellipsis-${index}`}
            onClick={() => {
              if (currentPage - 5 >= 1) {
                handleClick(currentPage - 5);
              } else {
                handleClick(1);
              }
            }}
            className="px-2 text-gray-500 transition-all hover:text-blue-500"
            title="Go back 5 pages"
          >
            <span className="group relative">
              <span className="text-sm group-hover:opacity-0">• • •</span>

              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <DoubleLeftOutlined className="text-sm" />
              </span>
            </span>
          </button>
        ) : page === 'RIGHT_ELLIPSIS' ? (
          <button
            key={`right-ellipsis-${index}`}
            onClick={() => {
              if (currentPage + 5 <= totalPages) {
                handleClick(currentPage + 5);
              } else {
                handleClick(totalPages);
              }
            }}
            className="px-2 text-gray-500 transition-all hover:text-blue-500"
            title="Go forward 5 pages"
          >
            <span className="group relative">
              <span className="text-sm group-hover:opacity-0">• • •</span>

              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <DoubleRightOutlined className="text-sm" />
              </span>
            </span>
          </button>
        ) : (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`cursor-pointer rounded px-3 py-1 text-sm transition-all ${
              currentPage === page
                ? 'border border-blue-500 text-blue-500 hover:opacity-80'
                : 'hover:bg-gray-100'
            }`}
            title={page.toString()}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer rounded px-3 py-1 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50"
      >
        <RightOutlined className="text-sm" />
      </button>
    </div>
  );
};

export default Pagination;
