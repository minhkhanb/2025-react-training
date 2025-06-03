'use client';

import { ColumnDef } from '@tanstack/react-table';
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
  const limit = Number(searchParams.get('limit')) || 10;

  const { isPending, isError, data, error } = useQuery<PaginatedResponse<Todo>>({
    queryKey: ['todos', currentPage, limit],
    queryFn: () => getTodos({ page: currentPage, limit }),
  });

  console.log(data);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenEditModal(true);
  };

  const handleDeleteTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenDeleteModal(true);
  };

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
    { accessorKey: 'id', header: 'ID', size: 60 },
    { accessorKey: 'title', header: 'Title', size: 300 },
    { accessorKey: 'completed', header: 'Completed', size: 100 },
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
        <div className="w-1/4 flex justify-end">
          <TodoAction />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pageSize={limit}
        pageCount={data ? Math.ceil(data.meta.total / limit) : 1}
        isLoading={isPending}
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
