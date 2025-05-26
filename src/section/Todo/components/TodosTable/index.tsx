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
import ToggleTodoStatus from '../ToggleTodoStatus';
import TodoActions from '../TodoActions';
import { TodosTableProps, TodoValue } from '../../types/ITodoList';

function TodosTable({
  todoListData,
  onDeleteTodo,
  sorting,
  setSorting,
  totalItems,
  pagination,
  setPagination,
}: TodosTableProps) {
  const columns = useMemo<ColumnDef<TodoValue>[]>(
    () => [
      {
        accessorKey: 'isFinish',
        header: 'Is Finish',
        size: 100,
        cell: ToggleTodoStatus,
        enableSorting: false,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 200,
        enableSorting: false,
      },
      {
        accessorKey: 'taskName',
        header: 'Task Name',
        size: 400,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'action',
        header: 'Action',
        size: 200,
        enableSorting: false,
        cell: info => <TodoActions info={info} onDeleteTodo={onDeleteTodo} />,
      },
    ],
    [onDeleteTodo]
  );

  const table = useReactTable({
    columns,
    data: todoListData,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
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
    <Table
      style={{
        display: 'grid',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <TableHeader
        style={{
          display: 'grid',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '2px solid #e2e8f0',
        }}
      >
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow
            key={headerGroup.id}
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            {headerGroup.headers.map(header => {
              return (
                <TableHead
                  key={header.id}
                  style={{
                    display: 'flex',
                    width: header.getSize(),
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '16px 12px',
                    color: '#ffffff',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    flexGrow: 1,
                  }}
                >
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                  {header.column.getCanSort() && (
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {header.column.getIsSorted() === 'asc' && <CaretUpOutlined />}
                      {header.column.getIsSorted() === 'desc' && <CaretDownOutlined />}
                      {header.column.getIsSorted() !== 'desc' &&
                        header.column.getIsSorted() !== 'asc' && (
                          <SwapOutlined className="rotate-90" />
                        )}
                    </div>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody style={{ backgroundColor: '#ffffff' }}>
        {table.getRowModel().rows.map((row, index) => (
          <TableRow
            key={row.id}
            style={{
              display: 'flex',

              backgroundColor: index % 2 !== 0 ? '#ffffff' : '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
            }}
          >
            {row.getVisibleCells().map(cell => {
              return (
                <TableCell
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#374151',
                    borderRight: '1px solid #e2e8f0',
                    lineHeight: '1.5',
                    flexGrow: 1,
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default memo(TodosTable);
