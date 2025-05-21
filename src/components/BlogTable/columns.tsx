import { ColumnDef } from '@tanstack/react-table';
import { Post } from './types';

export const columns: ColumnDef<Post>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Tiêu đề',
  },
  {
    accessorKey: 'author',
    header: 'Tác giả',
  },
  {
    accessorKey: 'date',
    header: 'Ngày đăng',
  },
];
