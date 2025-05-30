'use server';

import { SortingState } from '@tanstack/table-core';
import { fetchCourseApi } from '@src/section/Courses/makeData';

type CoursesDataWithSortingParams = {
  filters: {
    page?: number;
    limit?: number;
    offset?: number;
    sort?: SortingState;
  };
};

export async function fetchUsersDataWithSorting({
  filters: { page, limit, offset, sort },
}: CoursesDataWithSortingParams) {
  try {
    return await fetchCourseApi({ filters: { page, limit, offset, sort } });
  } catch (err) {
    console.error('PDebug Error fetching data with sorting:', err);
  }
}
