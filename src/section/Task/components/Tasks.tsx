import React, { useMemo } from 'react';
import Empty from '@src/components/Empty';
import Loading from '@src/components/Loading';
import { Task as TaskInterface, useTask } from '@src/components/Providers/TaskProvider';
import { cn } from '@src/utils/cn';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import CheckBox from '@src/components/ui/CheckBox';

interface Props {
  onUpdateTask: (task: TaskInterface) => void;
  onDeleteTask: (task: TaskInterface) => void;
  currentTask: TaskInterface | undefined;
}

const StatusCell = ({ isComplete }: { isComplete: boolean }) => (
  <span
    className={cn(
      'px-2 py-1 rounded-sm text-sm',
      isComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
    )}
  >
    {isComplete ? 'Completed' : 'Pending'}
  </span>
);

const ActionButtons = ({
  task,
  onUpdate,
  onDelete,
}: {
  task: TaskInterface;
  onUpdate: (task: TaskInterface) => void;
  onDelete: (task: TaskInterface) => void;
}) => (
  <div className="flex items-center gap-2">
    <button
      onClick={e => {
        e.stopPropagation();
        onUpdate(task);
      }}
      className="w-7 aspect-square rounded-sm bg-blue-300 text-white text-sm cursor-pointer"
    >
      <i className="fa-solid fa-pencil" />
    </button>
    <button
      onClick={e => {
        e.stopPropagation();
        onDelete(task);
      }}
      className="w-7 aspect-square rounded-sm bg-red-300 text-white text-sm cursor-pointer"
    >
      <i className="fa-solid fa-trash" />
    </button>
  </div>
);

const Tasks = ({ onUpdateTask, onDeleteTask, currentTask }: Props) => {
  const { tasks, currentFilter, isLoading, handleUpdateTask } = useTask();

  const columns = useMemo<ColumnDef<TaskInterface>[]>(
    () => [
      {
        header: '',
        accessorKey: 'id',
        cell: info => {
          const task = info.row.original;
          return (
            <CheckBox
              className="cursor-pointer"
              onChange={() => handleUpdateTask({ ...task, isComplete: !task.isComplete })}
              showLabel={false}
              checked={task.isComplete}
            />
          );
        },
      },
      {
        header: 'Title',
        accessorKey: 'title',
      },
      {
        header: 'Subtitle',
        accessorKey: 'subtitle',
      },
      {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: info => new Date(info.getValue<string>()).toLocaleString(),
      },
      {
        header: 'Status',
        accessorKey: 'isComplete',
        cell: info => <StatusCell isComplete={info.getValue<boolean>()} />,
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <ActionButtons task={row.original} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
        ),
      },
    ],
    [handleUpdateTask, onUpdateTask, onDeleteTask]
  );

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const titleMap = {
    'all-tasks': 'Not Found Tasks',
    'completed-tasks': 'Not Found Completed Tasks',
  } as Record<string, string>;

  const subtitleMap = {
    'all-tasks': "Let's create new task now!!!",
    'completed-tasks': "Let's complete task now!!!",
  } as Record<string, string>;

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-[400px]">
        <Loading />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="w-full flex items-center justify-center">
        <Empty
          title={titleMap[currentFilter] ?? 'No Tasks Found'}
          subtitle={subtitleMap[currentFilter] ?? 'No data available'}
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden pb-4 h-[410px]">
      <table className="w-full">
        <thead className="border-b border-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 text-md font-semibold text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={cn(
                'transition-all duration-500',
                row.original.id === currentTask?.id && 'bg-blue-100'
              )}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
