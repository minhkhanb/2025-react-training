'use client';
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
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
import Loading from '@src/components/common/Loading';

export default function DataTable<TData>({
  columns,
  pageSize,
  data,
  pageCount,
  isLoading,
}: {
  columns: ColumnDef<TData>[];
  pageSize?: number;
  data: TData[];
  pageCount: number;
  isLoading?: boolean;
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
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  useEffect(() => {
    table.setPageIndex(page - 1);
  }, [table, page]);

  useEffect(() => {
    table.setPageSize(pageSize ?? 10);
  }, [table, pageSize]);

  return (
    <div className="space-y-4">
      <Search value={filtering} onChange={setFiltering} />

      {isLoading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
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
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-gray-500">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-end">
        <p className="text-sm text-gray-600">
          Đã chọn <strong>{Object.keys(rowSelection).length}</strong> hàng
        </p>
      </div>

      <Pagination pageCount={pageCount} />
    </div>
  );
}
