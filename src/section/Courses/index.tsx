'use client';

import React from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  Row,
  SortingState,
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { fetchData, Person, PersonApiResponse } from '@src/section/Courses/makeData';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@src/components/shadcn/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@src/components/shadcn/ui/pagination';

const fetchSize = 50;

function Courses() {
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: info => info.getValue<Date>().toLocaleString(),
        size: 200,
      },
    ],
    []
  );

  //react-query has a useInfiniteQuery hook that is perfect for this use case
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<PersonApiResponse>({
    queryKey: [
      'people',
      sorting, //refetch when sorting changes
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * fetchSize;
      const fetchedData = await fetchData(start, fetchSize, sorting); //pretend api call
      return fetchedData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  //flatten the array of arrays from the useInfiniteQuery hook
  const flatData = React.useMemo(() => data?.pages?.flatMap(page => page.data) ?? [], [data]);
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
  });

  //scroll to top of table when sorting changes
  const handleSortingChange: OnChangeFn<SortingState> = updater => {
    setSorting(updater);
    if (!!table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0);
    }
  };

  //since this table option is derived from table row model state, we're using the table.setOptions utility
  table.setOptions(prev => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }));

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      ({flatData.length} of {totalDBRowCount} rows fetched)
      <div
        className="container"
        onScroll={e => fetchMoreOnBottomReached(e.currentTarget)}
        ref={tableContainerRef}
        style={{
          overflow: 'auto', //our scrollable table container
          position: 'relative', //needed for sticky header
          height: '450px', //should be a fixed height
        }}
      >
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
        <Table style={{ display: 'grid' }}>
          <TableHeader
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        display: 'flex',
                        width: header.getSize(),
                      }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              position: 'relative', //needed for absolute positioning of rows
            }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index] as Row<Person>;
              return (
                <TableRow
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  key={row.id}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    width: '100%',
                  }}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          display: 'flex',
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer select-none"
              onClick={() => table.previousPage()}
            />
          </PaginationItem>

          {(() => {
            const currentPage = table.getState().pagination.pageIndex;
            const totalPages = table.getPageCount();
            let pageNumbers = [];

            // Logic to determine which page numbers to show
            if (totalPages <= 5) {
              // If 5 or fewer pages, show all
              pageNumbers = Array.from({ length: totalPages }, (_, i) => i);
            } else if (currentPage < 3) {
              // Near the start
              pageNumbers = [0, 1, 2, 3, 4];
            } else if (currentPage > totalPages - 4) {
              // Near the end
              pageNumbers = Array.from({ length: 5 }, (_, i) => totalPages - 5 + i);
            } else {
              // In the middle
              pageNumbers = [
                currentPage - 2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                currentPage + 2,
              ];
            }

            return (
              <>
                {currentPage > 2 && totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => table.setPageIndex(0)}
                        className="cursor-pointer"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}

                {pageNumbers.map(pageNum => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      className="cursor-pointer"
                      onClick={() => table.setPageIndex(pageNum)}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages - 3 && totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => table.setPageIndex(totalPages - 1)}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
              </>
            );
          })()}

          <PaginationItem>
            <PaginationNext
              className="cursor-pointer select-none"
              onClick={() => table.nextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Courses;
