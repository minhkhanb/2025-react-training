import { PaginatedTodosResponse } from '@/section/Todo/types/ITodoList';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TodosStoreActions = {
  setTodos: (todos: PaginatedTodosResponse) => void;
  clearTodos: () => void;
};

type TodoValues = {
  todos: PaginatedTodosResponse;
};

const todosStore = create<TodoValues & TodosStoreActions>()(
  persist(
    set => ({
      todos: {
        data: [],
        pagination: {
          page: 0,
          limit: 0,
          total: 0,
          totalFinish: 0,
          totalPages: 0,
        },
      },
      setTodos: (todos: PaginatedTodosResponse) => set(() => ({ todos })),
      clearTodos: () =>
        set(() => ({
          todos: {
            data: [],
            pagination: {
              page: 0,
              limit: 0,
              total: 0,
              totalFinish: 0,
              totalPages: 0,
            },
          },
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export const useTodosStore = todosStore;
