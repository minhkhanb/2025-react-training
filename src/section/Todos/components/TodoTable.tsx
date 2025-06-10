'use client';

import { useTodo } from '@/src/components/providers/TodoProvider';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Button } from '@/src/components/shadcn/ui/button';
import { Todo } from '@/src/@types/todo.types';
import { Delete, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const TodoTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { todos, deleteTodo } = useTodo();

  const router = useRouter();

  const columns = useMemo<ColumnDef<Todo>[]>(
    () => [
      {
        header: 'Title',
        accessorKey: 'title',
      },
      {
        header: 'SubTitle',
        accessorKey: 'subTitle',
      },
      {
        header: 'Note',
        accessorKey: 'note',
      },
      {
        header: 'Create At',
        accessorKey: 'createAt',
        cell: ({ getValue }) => {
          const raw = getValue() as string;
          return new Date(raw).toISOString();
        },
      },
      {
        header: 'Update At',
        accessorKey: 'updateAt',
        cell: ({ getValue }) => {
          const raw = getValue() as string;
          return new Date(raw).toISOString();
        },
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-1">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => router.push(`/todos/update/${row.original.id}`)}
            >
              <Edit />
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => deleteTodo(row.original.id)}
            >
              <Delete />
            </Button>
          </div>
        ),
      },
    ],
    [deleteTodo, router]
  );

  const table = useReactTable({
    data: todos,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageCount = table.getPageCount();

  return (
    <div>
      <table className="w-full text-left border">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-2 border">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500"
              >
                No todos found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <div>
          {Array.from({ length: pageCount }, (_, i) => (
            <Button
              key={i}
              size="sm"
              onClick={() => table.setPageIndex(i)}
              className={`mx-1 cursor-pointer ${i === pagination.pageIndex ? 'font-bold bg-gray-200' : ''}`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TodoTable;
