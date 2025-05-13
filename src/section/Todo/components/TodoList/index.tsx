'use client';

import { TodoItem } from '../TodoItem';
import { EmptyState } from '../EmptyState';
import { TodoListProps, TodoValue } from '../../types/ITodoList';
import { Summary } from '../Summary';

export const TodoList = ({
  todoListData,
  handleChangeStatusTodoItem,
  askUpdate,
  askDelete,
}: TodoListProps) => {
  return (
    <div className="overflow-hidden rounded-b-xl bg-white shadow-xl">
      <div className="divide-y divide-gray-100">
        <EmptyState todos={todoListData} />

        {todoListData.length > 0 &&
          todoListData.map((item: TodoValue) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              handleChangeStatusTodoItemAction={handleChangeStatusTodoItem}
              askUpdateAction={askUpdate}
              askDelete={askDelete}
            />
          ))}
      </div>

      <Summary todos={todoListData} />
    </div>
  );
};
