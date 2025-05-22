'use client';

import { Person } from '@src/section/Courses/makeData';
import { ColumnDef, getCoreRowModel, getSortedRowModel, SortingState } from '@tanstack/table-core';
import React from 'react';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { Button } from '@src/components/ui';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from '@src/components/shadcn/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@src/components/shadcn/ui/table';
import { Loader2 } from 'lucide-react';
import { css } from '@emotion/react';

type Props = {
  data: Person[];
  totalRowCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sorting: SortingState;
  isLoading: boolean;
  onPaginationChange: (pageIndex: number) => void;
  onSortingChange: (sorting: SortingState) => void;
};

const TABLE_HEIGHT = 450;

// Custom hook for table columns
function useTableColumns() {
  return React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: 'Tên',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Họ</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Tuổi',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Lượt truy cập</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
      },
      {
        accessorKey: 'progress',
        header: 'Tiến độ',
        size: 80,
      },
      {
        accessorKey: 'createdAt',
        header: 'Ngày tạo',
        cell: info => info.getValue<Date>().toLocaleString(),
        size: 200,
      },
    ],
    []
  );
}

// Custom hook for pagination UI
function usePaginationRange(currentPage: number, pageCount: number) {
  return React.useMemo(() => {
    const pages: (number | string)[] = [];

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push('ellipsis-left');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pageCount - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < pageCount - 3) {
        pages.push('ellipsis-right');
      }

      if (pageCount > 1) {
        pages.push(pageCount);
      }
    }

    return pages;
  }, [currentPage, pageCount]);
}

export default function CoursesTable({
  data,
  totalRowCount,
  pagination,
  sorting,
  isLoading,
  onPaginationChange,
  onSortingChange,
}: Props) {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const columns = useTableColumns();

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalRowCount / pagination.pageSize),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newPagination = updater(pagination);
        onPaginationChange(newPagination.pageIndex);
      } else {
        onPaginationChange(updater.pageIndex);
      }
    },
    onSortingChange: updater => {
      if (typeof updater === 'function') {
        const newSorting = updater(sorting);
        onSortingChange(newSorting);
      } else {
        onSortingChange(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    debugTable: false,
  });

  // Get rows from table model
  const { rows } = table.getRowModel();

  const currentPage = pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const paginationRange = usePaginationRange(currentPage, pageCount);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Hiển thị trang {currentPage} trên tổng số {pageCount}
        {isLoading && (
          <span className="ml-2 inline-flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
            Đang tải...
          </span>
        )}
      </div>

      <div
        css={css`
          background: red;
        `}
      >
        Test emotion
      </div>

      <div
        className="rounded-md border"
        ref={tableContainerRef}
        style={{
          overflow: 'auto',
          position: 'relative',
          height: TABLE_HEIGHT,
        }}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} style={{ width: header.getSize() }}>
                    <div
                      className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage() || isLoading}
              className="cursor-pointer"
            >
              Start
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              className={!isLoading ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
              disabled={!table.getCanPreviousPage() || isLoading}
            />
          </PaginationItem>

          {paginationRange.map((page, idx) => (
            <PaginationItem key={idx}>
              {typeof page === 'number' ? (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => table.setPageIndex(page - 1)}
                  className={!isLoading ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                  disabled={isLoading}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              className={!isLoading ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
              disabled={!table.getCanNextPage() || isLoading}
            />
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage() || isLoading}
              className="cursor-pointer"
            >
              End
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
