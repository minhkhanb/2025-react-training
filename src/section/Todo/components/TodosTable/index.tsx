'use client';

import React, { memo, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CaretDownOutlined, CaretUpOutlined, SwapOutlined } from '@ant-design/icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import SelectTodoStatus from '../UpdateTodoStatus';
import TodoActions from '../TodoActions';
import { TodosTableProps, TodoToDeleteValues, TodoValue } from '../../types/ITodoList';
import { useTodosStore } from '@/store/todosStore';
import { getTriggerBg } from '../../utils/getTriggerBg';

function TodosTable({
  // todoListData,
  onDeleteTodo,
  sorting,
  setSorting,
  // totalItems,
  pagination,
  setPagination,
}: TodosTableProps) {
  const columns = useMemo<ColumnDef<TodoValue>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 200,
        enableSorting: false,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 200,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 300,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'dueDate',
        header: 'Due Date',
        size: 180,
        cell: info => {
          const value = info.getValue() as string;
          return new Date(value).toLocaleDateString();
        },
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        size: 120,
        cell: info => (
          <div
            className={`flex h-9 w-full items-center justify-center rounded-lg font-semibold ${getTriggerBg(info.getValue() as string)}`}
          >
            {info.getValue() === 'low' && '🟢 Low'}
            {info.getValue() === 'medium' && '🟡 Medium'}
            {info.getValue() === 'high' && '🔴 High'}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        cell: info => {
          const original = info.row.original;

          if (!original) return null;

          return <SelectTodoStatus original={original} />;
        },
      },
      {
        accessorKey: 'action',
        header: 'Action',
        size: 200,
        enableSorting: false,
        cell: info => {
          const original = info.row.original;

          if (!original) return null;

          const todoToDelete: TodoToDeleteValues = {
            id: original.id,
            title: original.title,
          };

          return <TodoActions todoToDelete={todoToDelete} onDeleteTodo={onDeleteTodo} />;
        },
      },
    ],
    [onDeleteTodo]
  );

  const todos = useTodosStore(state => state.todos.data);

  const TotalTodos = useTodosStore(state => state.todos.pagination.total);

  // const data = useMemo(() => todos, [todos]);

  const table = useReactTable({
    columns,
    data: todos,
    pageCount: Math.ceil(TotalTodos / pagination.pageSize),
    state: { sorting, pagination },
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newPagination = updater(pagination);

        setPagination(prev => ({ ...prev, pageIndex: newPagination.pageIndex }));
      } else {
        setPagination(prev => ({ ...prev, pageIndex: updater.pageIndex }));
      }
    },
    onSortingChange: updater => {
      if (typeof updater === 'function') {
        const newSorting = updater(sorting);

        setSorting(newSorting);
      } else {
        setSorting(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <Table className="grid w-full overflow-auto rounded-xl">
      <TableHeader className="sticky top-0 z-[1] grid border-b-2 border-slate-200 bg-gradient-to-r from-indigo-500 to-purple-600">
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} className="flex w-full">
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className="relative flex flex-grow items-center justify-center border-r border-white/10 px-3 py-4 text-sm font-semibold tracking-wider text-white uppercase transition-all"
                style={{ width: header.getSize() }} // giữ lại width dynamic
              >
                <div className="w-full text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
                {header.column.getCanSort() && (
                  <div onClick={header.column.getToggleSortingHandler()}>
                    {header.column.getIsSorted() === 'asc' && <CaretUpOutlined />}
                    {header.column.getIsSorted() === 'desc' && <CaretDownOutlined />}
                    {!header.column.getIsSorted() && <SwapOutlined className="rotate-90" />}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody className="bg-white">
        {table.getRowModel().rows.map((row, index) => (
          <TableRow
            key={row.id}
            className={`flex border-b border-slate-200 transition-all ${
              index % 2 !== 0 ? 'bg-white' : 'bg-slate-50'
            }`}
          >
            {row.getVisibleCells().map(cell => (
              <TableCell
                key={cell.id}
                className="flex flex-grow items-center justify-center border-r border-slate-200 px-4 py-3 text-sm leading-snug text-slate-700"
                style={{ width: cell.column.getSize() }} // giữ lại width dynamic
              >
                <div className="w-full truncate overflow-hidden text-center whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default memo(TodosTable);
