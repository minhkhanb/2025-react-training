'use client';
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  RowSelectionState,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@src/components/shadcn/ui/table';
import { Search } from './Search';
import { Pagination } from './Pagination';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function DataTable<TData>({
  columns,
  pageSize = 5,
  data,
  pageCount,
}: {
  columns: ColumnDef<TData>[];
  pageSize?: number;
  data: TData[];
  pageCount: number;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<string>('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  useEffect(() => {
    table.setPageIndex(page - 1);
  }, [table, page]);

  return (
    <div className="space-y-4">
      <Search value={filtering} onChange={setFiltering} />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  style={{ width: header.column.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' ↑',
                    desc: ' ↓',
                  }[header.column.getIsSorted() as string] ?? null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <p className="text-sm text-gray-600">
          Đã chọn <strong>{Object.keys(rowSelection).length}</strong> hàng
        </p>
      </div>

      <Pagination pageCount={pageCount} />
    </div>
  );
}
