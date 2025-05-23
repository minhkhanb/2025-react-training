'use client';

import { createContext, useContext, useState } from 'react';
import { Todo } from '@src/types/todo';
import { todos as initialTodos } from '@src/data/todos';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTodo: (id: number, todo: Partial<Todo>) => void;
  removeTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: todos.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (id: number, updatedFields: Partial<Todo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? {
              ...todo,
              ...updatedFields,
              updatedAt: new Date(),
            }
          : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
