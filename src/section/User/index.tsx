'use client';

import { RowSelectionState } from '@tanstack/react-table';
import { PaginatedResponse } from '@src/types/todo';
import { User } from '@src/types/user';
import DataTable from '@src/components/common/DataTable';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@src/app/api/users/route';
import { useSearchParams } from 'next/navigation';
import { HeaderSection } from './components/HeaderSection';
import { UserAction, EditUserDrawer, ConfirmDeleteUser } from './components';
import { userColumns } from './columns';

export default function UserListSection() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 5;
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const { isPending, isError, data, error } = useQuery<PaginatedResponse<User>>({
    queryKey: ['users', currentPage, limit, search, sortBy, sortOrder],
    queryFn: () =>
      getUsers({
        page: currentPage,
        limit,
        search,
        sortBy,
        sortOrder,
      }),
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const handleEditUser = (User: User) => {
    setSelectedUser(User);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (User: User) => {
    setSelectedUser(User);
    setOpenDeleteModal(true);
  };

  const columns = userColumns({
    onEdit: handleEditUser,
    onDelete: handleDeleteUser,
  });

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="w-3/4 flex justify-start">
          <HeaderSection />
        </div>
        <div className="w-1/4 flex justify-end gap-2">
          <UserAction />
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
      {selectedUser && (
        <>
          <EditUserDrawer
            data={selectedUser}
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
          />
          <ConfirmDeleteUser
            id={selectedUser.id}
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
          />
        </>
      )}
    </div>
  );
}
