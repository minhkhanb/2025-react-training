'use client';

import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { Button } from '@src/components/shadcn/ui/button';
import { Todo, PaginatedResponse } from '@src/types/todo';
import DataTable from '@src/components/common/DataTable';
import { Trash2, Pencil } from 'lucide-react';
import { Checkbox } from '@src/components/shadcn/ui/checkbox';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EditTodoModal, ConfirmDeleteModal, TodoAction, HeaderSection } from './components';
import { getTodos } from '@src/app/api/todos/route';
import { useSearchParams } from 'next/navigation';

export default function TodoListSection() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;

  const { isPending, isError, data, error } = useQuery<PaginatedResponse<Todo>>({
    queryKey: ['todos', currentPage, limit],
    queryFn: () => getTodos({ page: currentPage, limit }),
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenEditModal(true);
  };

  const handleDeleteTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenDeleteModal(true);
  };

  const selectedIds = Object.keys(rowSelection)
    .map(idx => data?.data[Number(idx)]?.id)
    .filter(Boolean) as string[];

  const columns: ColumnDef<Todo>[] = [
    {
      id: 'select',
      size: 50,
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || false}
          onCheckedChange={value => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected() || false}
          onCheckedChange={value => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
    },
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'title', header: 'Title' },
    {
      accessorKey: 'completed',
      header: 'Completed',
      cell: ({ row }) => (
        <span
          className={
            row.original.completed
              ? 'inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800'
              : 'inline-block px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800'
          }
        >
          {row.original.completed ? 'True' : 'False'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 120,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={() => handleEditTodo(row.original)}
          >
            <Pencil strokeWidth={1.5} />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => handleDeleteTodo(row.original)}>
            <Trash2 strokeWidth={1.5} />
          </Button>
        </div>
      ),
    },
  ];

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="w-3/4 flex justify-start">
          <HeaderSection />
        </div>
        <div className="w-1/4 flex justify-end gap-2">
          <TodoAction
            selectedIds={selectedIds}
            setRowSelectionAction={val => setRowSelection(val as RowSelectionState)}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pageSize={limit}
        pageCount={data ? Math.ceil(data.meta.total / limit) : 1}
        isLoading={isPending}
        rowSelection={rowSelection}
        onRowSelectionChangeAction={setRowSelection}
      />
      {selectedTodo && (
        <>
          <EditTodoModal
            data={selectedTodo}
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
          />
          <ConfirmDeleteModal
            data={selectedTodo}
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          />
        </>
      )}
    </div>
  );
}
