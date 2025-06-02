'use client';

import React, { useMemo } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { getVisiblePages } from '../../utils/getVisiblePages';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useTodosStore } from '@/store/todosStore';

interface PaginationProps {
  // totalItems: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const TodosPagination = ({
  // totalItems,
  itemsPerPage = 2,
  currentPage,
  onPageChange,
  isLoading,
}: PaginationProps) => {
  const TotalTodos = useTodosStore(state => state.todos.pagination?.total ?? 0);

  const totalPages = useMemo(
    () => Math.ceil(TotalTodos / itemsPerPage),
    [itemsPerPage, TotalTodos]
  );

  // console.log('Totaltodos', Totaltodos);

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
  ${disabled || isLoading ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 border-gray-300'}`;

  const pageButtonClass = (active: boolean) =>
    `min-w-[36px] font-semibold px-2 py-1 rounded cursor-pointer  text-sm transition
   ${active ? 'border-gray-500  border text-gray-600 bg-gray-50 font-medium' : 'text-gray-700 hover:bg-gray-100 border-gray-300'}
   ${isLoading ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 border-gray-300'}`;

  return (
    <Pagination className="mt-5">
      <PaginationContent className="flex-wrap justify-center">
        <PaginationItem>
          <PaginationLink
            onClick={() => handleClick(1)}
            className={buttonClass(currentPage === 1) + ' h-8 w-14 rounded-md'}
          >
            First
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleClick(currentPage - 1)}
            className={
              buttonClass(currentPage === 1) +
              ' flex h-7 items-center justify-center border-0 outline-none'
            }
          ></PaginationPrevious>
        </PaginationItem>

        {visiblePages.map((page, idx) =>
          page === 'LEFT_ELLIPSIS' ? (
            <PaginationItem key={`left-${idx}`}>
              <PaginationEllipsis
                onClick={() => handleClick(Math.max(currentPage - 5, 1))}
                title="Back 5 pages"
                className="cursor-pointer hover:text-gray-600"
              >
                <DoubleLeftOutlined />
              </PaginationEllipsis>
            </PaginationItem>
          ) : page === 'RIGHT_ELLIPSIS' ? (
            <PaginationItem key={`right-${idx}`}>
              <PaginationEllipsis
                onClick={() => handleClick(Math.min(currentPage + 5, totalPages))}
                title="Forward 5 pages"
                className="cursor-pointer hover:text-gray-600"
              >
                <DoubleRightOutlined />
              </PaginationEllipsis>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handleClick(page)}
                isActive={page === currentPage}
                className={pageButtonClass(page === currentPage)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => handleClick(currentPage + 1)}
            className={
              buttonClass(currentPage === totalPages) +
              ' flex h-7 items-center justify-center border-0 outline-none'
            }
          ></PaginationNext>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => handleClick(totalPages)}
            className={buttonClass(currentPage === totalPages) + ' h-8 w-14 rounded-md'}
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TodosPagination;
