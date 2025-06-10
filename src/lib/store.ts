import { Todo } from '@src/types/todo';
import { create } from 'zustand';

type TodoStore = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>(set => ({
  todos: [],

  addTodo: todo => {
    set(state => ({ todos: [...state.todos, todo] }));
  },

  updateTodo: todo => {
    set(state => ({ todos: state.todos.map(t => (t.id === todo.id ? todo : t)) }));
  },

  removeTodo: id => {
    set(state => ({ todos: state.todos.filter(t => t.id !== id) }));
  },
}));
