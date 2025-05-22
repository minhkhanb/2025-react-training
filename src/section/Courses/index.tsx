'use client';

import React from 'react';
import { Person } from './makeData';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortingState } from '@tanstack/table-core';
import { fetchTableData } from '@src/server/actions/courses';
import { Loader2 } from 'lucide-react';
import CoursesTable from '@src/section/Courses/components/CoursesTable';

type Props = {
  initialData: {
    data: Person[];
    meta: {
      totalRowCount: number;
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
  const [totalRowCount, setTotalRowCount] = React.useState<number>(initialData.meta.totalRowCount);

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

  const fetchData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetchTableData(pagination.pageIndex, pagination.pageSize, sorting);
      setTableData(result.data || []);
      setTotalRowCount(result.meta.totalRowCount || 0);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  React.useEffect(() => {
    updateUrl(pagination.pageIndex);
  }, [pagination.pageIndex, updateUrl]);

  React.useEffect(() => {
    const isSortingChanged = sorting.length > 0;

    if (isSortingChanged) {
      fetchData();
    }
  }, [fetchData, sorting]);

  const handlePageChange = React.useCallback(
    (newPageIndex: number) => {
      setPagination(prev => ({ ...prev, pageIndex: newPageIndex }));

      fetchData();
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
    <CoursesTable
      data={tableData}
      totalRowCount={totalRowCount}
      pagination={pagination}
      sorting={sorting}
      isLoading={isLoading}
      onPaginationChange={handlePageChange}
      onSortingChange={handleSortingChange}
    />
  );
}

export default Courses;
