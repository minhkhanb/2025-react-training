import { Table } from '@tanstack/react-table';
import { Button } from '@src/components/ui/button';

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Trước
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Sau
      </Button>
      <span>
        Trang{' '}
        <strong>
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </strong>
      </span>
    </div>
  );
}
