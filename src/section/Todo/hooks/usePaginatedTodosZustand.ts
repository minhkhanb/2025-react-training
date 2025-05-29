import { useEffect, useState } from 'react';
import { getTodoCacheKey } from '../utils/getTodoCacheKey';
import { getAllTodo } from '../api/todoService';
import { useCacheTodosStore } from '@/store/cacheTodosStore';
import { SortingState } from '@tanstack/react-table';
import { PaginatedTodosResponse } from '../types/ITodoList';

export const usePaginatedTodosZustand = (page: number, pageSize: number, sorting: SortingState) => {
  const sortType = sorting[0]?.desc ? 'desc' : 'asc';
  const sortColumn = sorting[0]?.id || '';

  const cacheKey = getTodoCacheKey(page, pageSize, sortColumn, sortType);
  const { cache, setCache } = useCacheTodosStore();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaginatedTodosResponse | undefined>(cache[cacheKey]);

  useEffect(() => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      return;
    }

    setLoading(true);
    getAllTodo(page, pageSize, sortType, sortColumn)
      .then(todos => {
        setCache(cacheKey, todos);
        setData(todos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cacheKey, page, pageSize, sortType, sortColumn, cache, setCache]);

  return {
    data,
    isLoading: loading,
  };
};
