'use server';

import { SortingState } from '@tanstack/table-core';
import { fetchData } from '@src/section/Courses/makeData';

export async function fetchInitialData(pageIndex: number, sorting: SortingState = []) {
  const PAGE_SIZE = 10;

  try {
    return await fetchData(pageIndex * PAGE_SIZE, PAGE_SIZE, sorting);
  } catch (err) {
    console.error('Error fetching initial data:', err);
    throw new Error('Failed to fetch initial data');
  }
}

export async function fetchTableData(pageIndex: number, pageSize: number, sorting: SortingState) {
  try {
    const start = pageIndex * pageSize;

    return await fetchData(start, pageSize, sorting);
  } catch (err) {
    console.error('Error fetching table data:', err);
    throw new Error('Failed to fetch table data');
  }
}
