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
  itemsPerPage = 2,
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

  const buttonClass = (disabled: boolean) =>
    `min-w-[36px] font-semibold px-2 py-1 cursor-pointer rounded border text-sm transition 
  ${disabled ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 border-gray-300'}`;

  const pageButtonClass = (active: boolean) =>
    `min-w-[36px] font-semibold px-2 py-1 rounded cursor-pointer  text-sm transition
  ${active ? 'border-gray-500  border text-gray-600 bg-gray-50 font-medium' : 'text-gray-700 hover:bg-gray-100 border-gray-300'}`;

  return (
    <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-1 sm:gap-2">
      {/* First */}
      <button
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
        className={buttonClass(currentPage === 1)}
      >
        First
      </button>

      {/* Previous */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={pageButtonClass(currentPage === -1)}
      >
        <LeftOutlined /> <span className="hidden md:inline-block">Previous</span>
      </button>

      {/* Page Numbers */}
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
            className="px-1 text-gray-500 transition-all sm:px-2"
            title="Go back 5 pages"
          >
            <span className="group relative cursor-pointer hover:text-gray-500">
              <span className="text-xs tracking-wide group-hover:opacity-0 sm:text-sm">•••</span>

              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <DoubleLeftOutlined className="text-xs sm:text-sm" />
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
            className="px-1 text-gray-500 transition-all sm:px-2"
            title="Go forward 5 pages"
          >
            <span className="group relative cursor-pointer hover:text-gray-500">
              <span className="text-xs tracking-wide group-hover:opacity-0 sm:text-sm">•••</span>

              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <DoubleRightOutlined className="text-xs sm:text-sm" />
              </span>
            </span>
          </button>
        ) : (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={pageButtonClass(currentPage === page)}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={pageButtonClass(currentPage === -1)}
      >
        <span className="hidden md:inline-block">Next</span> <RightOutlined />
      </button>

      {/* Last */}
      <button
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
        className={buttonClass(currentPage === totalPages)}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
