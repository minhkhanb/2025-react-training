import { PaginatedTodosResponse } from '@/section/Todo/types/ITodoList';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TodoCacheKey = string; // e.g., "page=1|sort=desc|column=title"

type TodosStore = {
  cache: Record<TodoCacheKey, PaginatedTodosResponse>;
  setCache: (key: TodoCacheKey, todos: PaginatedTodosResponse) => void;
  clearCache: () => void;
};

export const useCacheTodosStore = create<TodosStore>()(
  persist(
    set => ({
      cache: {},
      setCache: (key, todos) =>
        set(state => ({
          cache: {
            ...state.cache,
            [key]: todos,
          },
        })),
      clearCache: () => set(() => ({ cache: {} })),
    }),
    {
      name: 'todos-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
