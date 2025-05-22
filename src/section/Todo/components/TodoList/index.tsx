'use client';

import { memo, useMemo } from 'react';
// import { TodoItem } from '../TodoItem';
import { EmptyState } from '../EmptyState';
import { TodoListProps, TodoValue } from '../../types/ITodoList';
import { Summary } from '../Summary';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Checkbox from '@/components/ui/Checkbox';
import { useToggleTodoStatus } from '../../hooks/useToggleTodoStatus';
import { useRouter } from 'next/navigation';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

export const TodoList = memo(function TodoList({
  todoListData,
  // askUpdate,
  askDelete,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  isLoading,
  totalTodos,
  todosCompleted,
}: TodoListProps) {
  // const currentTodos = useMemo(
  //   () => todoListData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
  //   [currentPage, itemsPerPage, todoListData]
  // );
  const router = useRouter();
  const updateStatusMutation = useToggleTodoStatus();

  const columns = useMemo<ColumnDef<TodoValue>[]>(
    () => [
      {
        accessorKey: 'isFinish',
        header: 'Is Finish',
        size: 100,
        cell: info => (
          <Checkbox
            label={''}
            defaultChecked={info.getValue() as boolean}
            onChange={() => updateStatusMutation.mutate({ id: info.row.original.id })}
          />
        ),
      },
      {
        accessorKey: 'id',
        header: 'ID',
        size: 200,
      },
      {
        accessorKey: 'message',
        header: 'Message',
        size: 400,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'action',
        header: 'Action',
        size: 200,
        cell: info => (
          <div>
            <button
              onClick={() => {
                router.push(`/update-todo/${info.row.original.id}`);
                // askUpdateAction(todoItem);
              }}
              className="h-10 w-10 cursor-pointer rounded-full text-gray-400 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <EditOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
            </button>

            <button
              onClick={() => askDelete(info.row.original)}
              className="ml-2 h-10 w-10 cursor-pointer rounded-full text-gray-400 transition-colors duration-200 hover:bg-red-100 hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              <CloseOutlined className="flex h-5 w-5 justify-center rounded-b-full text-xs" />
            </button>
          </div>
        ),
      },
    ],
    [askDelete, router, updateStatusMutation]
  );

  const table = useReactTable({
    columns,
    data: todoListData,
    getCoreRowModel: getCoreRowModel(),
    // columnResizeMode: 'onChange',
  });

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-xl">
      {/* <div className="divide-y divide-gray-100">
        {isLoading ? <Loading className="h-96" /> : <EmptyState todos={todoListData} />}
        {todoListData.length > 0 &&
          todoListData.map((item: TodoValue) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              // askUpdateAction={askUpdate}
              askDelete={askDelete}
            />
          ))}
      </div> */}
      {isLoading ? <Loading className="h-96" /> : <EmptyState todos={todoListData} />}

      {todoListData.length > 0 && (
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
      )}

      <Pagination
        totalItems={totalTodos}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />

      <Summary totalTodos={totalTodos} todosCompleted={todosCompleted} />
    </div>
  );
});
