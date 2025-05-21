'use client';

import { Table } from '@tanstack/react-table';
import {
  Pagination as PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@src/components/ui/pagination';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const renderPageNumbers = () => {
    const items = [];
    const maxVisiblePages = 3;
    const siblingsCount = Math.floor((maxVisiblePages - 1) / 2);

    let startPage = Math.max(1, currentPage - siblingsCount);
    let endPage = Math.min(pageCount, currentPage + siblingsCount);

    if (currentPage <= siblingsCount) {
      endPage = Math.min(pageCount, maxVisiblePages);
    } else if (currentPage >= pageCount - siblingsCount) {
      startPage = Math.max(1, pageCount - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => table.setPageIndex(0)}
            isActive={currentPage === 1}
            className="h-9 w-9 cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationLink className="h-9 w-9 cursor-default">...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => table.setPageIndex(i - 1)}
            isActive={currentPage === i}
            className="h-9 w-9 cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationLink className="h-9 w-9 cursor-default">...</PaginationLink>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={pageCount}>
          <PaginationLink
            onClick={() => table.setPageIndex(pageCount - 1)}
            isActive={currentPage === pageCount}
            className="h-9 w-9 cursor-pointer"
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <PaginationUI>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => table.setPageIndex(0)}
              aria-disabled={currentPage === 1}
              className={`h-9 ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            >
              First
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              aria-disabled={!table.getCanPreviousPage()}
              className={`h-9 ${
                !table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }`}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              aria-disabled={!table.getCanNextPage()}
              className={`h-9 ${
                !table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }`}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={() => table.setPageIndex(pageCount - 1)}
              aria-disabled={currentPage === pageCount}
              className={`h-9 ${currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            >
              Last
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </PaginationUI>
    </div>
  );
}
