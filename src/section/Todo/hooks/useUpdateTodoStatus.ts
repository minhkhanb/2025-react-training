import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatusTodo } from '../api/todoService';
import { getQueryKey } from '../utils/getQuerykey';
import { PaginatedTodosResponse } from '../types/ITodoList';

export const useUpdateTodoStatus = () => {
  const queryClient = useQueryClient();

  const key = getQueryKey();

  return useMutation({
    mutationFn: updateStatusTodo,

    onSuccess: (_, { id, status }) => {
      let flag = -1;

      queryClient.setQueryData<PaginatedTodosResponse>(key, oldData => {
        if (!oldData) return oldData;

        const updatedTodos = (oldData.data ?? []).map(item => {
          if (item.id === id && item.status !== 'done' && status === 'done') {
            flag = 1;
          }

          if (item.id === id && item.status !== 'done' && status !== 'done') {
            flag = 0;
          }

          return item.id === id ? { ...item, status } : item;
        });

        const pagination = oldData.pagination ?? {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
          sortType: 0,
          sortColumn: '',
          totalFinish: 0,
        };

        return {
          ...oldData,
          pagination: {
            ...pagination,
            totalFinish: pagination.totalFinish + flag,
          },
          data: updatedTodos,
        };
      });

      const queries = queryClient.getQueryCache().findAll({ queryKey: ['todos'] });

      queries.forEach(query => {
        const qKey = query.queryKey;

        if (JSON.stringify(qKey) === JSON.stringify(key)) return;

        queryClient.setQueryData<PaginatedTodosResponse>(qKey, oldData => {
          if (!oldData) return oldData;

          const pagination = oldData.pagination ?? {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
            sortType: 0,
            sortColumn: '',
            totalFinish: 0,
          };

          return {
            ...oldData,
            pagination: {
              ...pagination,
              totalFinish: pagination.totalFinish + flag,
            },
          };
        });
      });
    },
  });
};
