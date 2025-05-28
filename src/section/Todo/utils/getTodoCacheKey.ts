export const getTodoCacheKey = (
  page: number,
  pageSize: number,
  sortColumn?: string,
  sortType?: string
): string => {
  return `page=${page}|size=${pageSize}|sort=${sortColumn || ''}|dir=${sortType || ''}`;
};
