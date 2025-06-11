'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Todo } from '@/src/@types/todo.types';
import { v4 as uuidv4 } from 'uuid';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, subTitle: string, note: string) => void;
  updateTodo: (
    id: string,
    title: string,
    subTitle: string,
    note: string
  ) => void;
  deleteTodo: (id: string) => void;
  findTodo: (id: string) => Todo;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo must be used within TodoProvider');
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string, subTitle: string, note: string) => {
    const newTodo = {
      id: uuidv4(),
      title,
      subTitle,
      note,
      createAt: new Date(),
      updateAt: new Date(),
    };
    setTodos(todo => [newTodo, ...todo]);
  };

  const updateTodo = (
    id: string,
    title: string,
    subTitle: string,
    note: string
  ) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, title, subTitle, note, updateAt: new Date() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const findTodo = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return todo;
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, findTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
