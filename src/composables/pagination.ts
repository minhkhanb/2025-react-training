import React from 'react';

export function usePagination(totalCount: number) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [offset, setOffset] = React.useState(0);
  const [limit] = React.useState(10);

  const total = totalCount ?? 0;

  const numberOfPages = React.useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset(page * limit - limit);
  };

  return {
    currentPage,
    offset,
    limit,
    numberOfPages,
    handlePageChange,
  };
}
