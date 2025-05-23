'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@src/components/ui/button';
import { Todo } from '@src/types/todo';
import DataTable from '@src/components/DataTable';
import { Trash2, Pencil } from 'lucide-react';
import { Checkbox } from '@src/components/ui/checkbox';
import { cn } from '@src/lib/utils';
import { useTodo } from '@src/context/todoContext';
import { EditTodoModal, ConfirmDeleteModal, TodoAction, HeaderSection } from './components';

const typeStyles = {
  pending: 'bg-blue-100 border-blue-500 text-blue-800',
  'in-progress': 'bg-orange-100 border-orange-500 text-orange-800',
  completed: 'bg-green-100 border-green-500 text-green-800',
  low: 'bg-emerald-100 border-emerald-500 text-emerald-800',
  medium: 'bg-yellow-100 border-yellow-500 text-yellow-800',
  high: 'bg-red-100 border-red-500 text-red-800',
};

export default function TodoListSection() {
  const { todos } = useTodo();

  const columns: ColumnDef<Todo>[] = [
    {
      id: 'select',
      size: 50,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || false}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected() || false}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    { accessorKey: 'id', header: 'ID', size: 50 },
    { accessorKey: 'title', header: 'Title', size: 200 },
    { accessorKey: 'description', header: 'Description', size: 300 },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 120,
      cell: ({ row }) => (
        <p className={cn(typeStyles[row.original.status], 'p-1 text-center rounded-lg')}>
          {row.original.status}
        </p>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      size: 120,
      cell: ({ row }) => (
        <p className={cn(typeStyles[row.original.priority], 'p-1 text-center rounded-lg')}>
          {row.original.priority}
        </p>
      ),
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      size: 120,
      cell: ({ row }) => <p className="text-center">{row.original.dueDate.toLocaleDateString()}</p>,
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 120,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <EditTodoModal
            data={row.original}
            trigger={
              <Button className="cursor-pointer" variant="outline" size="sm">
                <Pencil strokeWidth={1.5} />
              </Button>
            }
          />
          <ConfirmDeleteModal
            data={row.original}
            trigger={
              <Button variant="destructive" size="sm">
                <Trash2 strokeWidth={1.5} />
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="w-3/4 flex justify-start">
          <HeaderSection />
        </div>
        <div className="w-1/4 flex justify-end">
          <TodoAction />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={todos}
        pageSize={3}
        pageCount={Math.ceil(todos.length / 3)}
      />
    </div>
  );
}
