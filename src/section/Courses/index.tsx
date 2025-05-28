'use client';

import React from 'react';
import { Person } from './makeData';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/table-core';
import { fetchTableData } from '@src/server/actions/courses';
import { Loader2 } from 'lucide-react';
import CoursesTable from '@src/section/Courses/components/CoursesTable';
import { useGetCourses } from '@src/api/courses/queries';
import { Button } from '@src/components/ui';
import Link from 'next/link';

type Props = {
  initialData: {
    data: Person[];
    pagination: {
      total: number;
    };
  };
  initialPage: number;
};

function Courses({ initialData, initialPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [tableData, setTableData] = React.useState<Person[]>(initialData.data);
  const [totalRowCount, setTotalRowCount] = React.useState<number>(initialData.pagination.total);

  const getCourses = useGetCourses();

  console.log('PDebug getCourses: ', getCourses.data);

  const PAGE_SIZE = 10;

  const [pagination, setPagination] = React.useState({
    pageIndex: initialPage,
    pageSize: PAGE_SIZE,
  });

  const updateUrl = React.useCallback(
    (pageIndex: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(pageIndex + 1));

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const fetchData = React.useCallback(
    async (page: number) => {
      try {
        console.log('PDebug pagination: ', pagination);
        setIsLoading(true);
        const result = await fetchTableData(page, pagination.pageSize, sorting);
        setTableData(result.data || []);
        setTotalRowCount(result.pagination.total || 0);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.pageIndex, pagination.pageSize, sorting]
  );

  React.useEffect(() => {
    updateUrl(pagination.pageIndex);
  }, [pagination.pageIndex, updateUrl]);

  React.useEffect(() => {
    const isSortingChanged = sorting.length > 0;

    if (isSortingChanged) {
      fetchData(pagination.pageIndex);
    }
  }, [fetchData, sorting, pagination]);

  const handlePageChange = React.useCallback(
    (newPageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex: newPageIndex }));

      fetchData(newPageIndex);
    },
    [fetchData]
  );

  const handleSortingChange = React.useCallback((newSorting: SortingState) => {
    setSorting(newSorting);

    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, []);

  if (!initialData && isLoading) {
    return (
      <div className="flex justify-center items-center h-[450px">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <p className="sr-only flex items-center gap-2 font-mono text-xs/6 font-medium tracking-tight-widest text-gray-600 uppercase dark:text-gray-400">
        Layout
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Courses
      </h1>
      <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <div className="prose mt-10">
        <div className="not-prose relative isolate scroll-mt-16">
          <div className="flex justify-end">
            <Button as={Link} href="/courses/add">
              Add new course
            </Button>
          </div>
          <div className="w-full overflow-x-auto whitespace-nowrap">
            <CoursesTable
              data={tableData}
              totalRowCount={totalRowCount}
              pagination={pagination}
              sorting={sorting}
              isLoading={isLoading}
              onPaginationChangeAction={handlePageChange}
              onSortingChangeAction={handleSortingChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
