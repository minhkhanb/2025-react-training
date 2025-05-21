'use client';

import React from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { makeData, Person } from '@src/section/Courses/makeData';

const sortStatusFn: SortingFn<Person> = (rowA, rowB, _columnId) => {
  const statusA = rowA.original.status;
  const statusB = rowB.original.status;
  const statusOrder = ['single', 'relationship', 'married', 'complicated'];

  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
    sortUndefined: 'last',
    sortDescFirst: false,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
  },
  {
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
    sortingFn: sortStatusFn,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    // enableSorting: false, // disable sorting on this column
  },
  {
    accessorKey: 'rank',
    header: 'Rank',
    invertSorting: true, //invert the sorting order (golf score-like where smaller is better)
  },
];

function Courses({ initialData }: { initialData: Person[] }) {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [data, setData] = React.useState(() => initialData);
  const refreshData = () => setData(() => makeData(100_000));
  //stress test with 100k rows

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-size sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    //state in your own scope for easy access
    // sortingFns: {
    //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    // },
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      sorting,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
    // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
    // enableSorting: false, // - default on/true
    // enableSortingRemoval: false, //Don't allow - default on/true
    // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
    // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity
  });

  //access sorting state from the table instance
  console.log(table.getState().sorting);

  return (
    <div>
      Course123
      <div>title</div>
      <div>button</div>
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === 'asc'
                                ? 'Sort ascending'
                                : header.column.getNextSortingOrder() === 'desc'
                                  ? 'Sort descending'
                                  : 'Clear sort'
                              : undefined
                          }
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div>{table.getRowModel().rows.length.toLocaleString()} Rows</div>
        <div>
          <button onClick={() => rerender()} className="border cursor-pointer">
            Force Rerender
          </button>
        </div>
        <div>
          <button onClick={() => refreshData()} className="border cursor-pointer">
            Refresh Data
          </button>
        </div>
        <pre>{JSON.stringify(sorting, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Courses;
