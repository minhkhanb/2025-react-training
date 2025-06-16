import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@src/components/shadcn/ui/button';
import { User } from '@src/types/user';
import { Trash2, Pencil } from 'lucide-react';
import dayjs from 'dayjs';

interface UserColumnsProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const userColumns = ({ onEdit, onDelete }: UserColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => dayjs(row.original.createdAt).format('DD/MM/YYYY HH:mm'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => dayjs(row.original.updatedAt).format('DD/MM/YYYY HH:mm'),
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 120,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(row.original)}
          className="h-8 w-8 p-0"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(row.original)}
          className="h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
