import { create } from 'zustand';
import { devtools, persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Todo } from '@src/types/todo';

type TodoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
};

const mockStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      immer(set => ({
        todos: [],
        addTodo: todo =>
          set(
            state => {
              state.todos.push(todo);
            },
            false,
            { type: 'addTodo', todo }
          ),
        updateTodo: todo =>
          set(
            state => {
              const index = state.todos.findIndex(t => t.id === todo.id);
              if (index !== -1) state.todos[index] = todo;
            },
            false,
            { type: 'updateTodo', todo }
          ),
        removeTodo: id =>
          set(
            state => {
              state.todos = state.todos.filter(t => t.id !== id);
            },
            false,
            { type: 'removeTodo', id }
          ),
      })),
      {
        name: 'todo-store',
        storage: createJSONStorage(() =>
          typeof window !== 'undefined' ? localStorage : mockStorage
        ),
      }
    ),
    {
      name: 'todo-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
