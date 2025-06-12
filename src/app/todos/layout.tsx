import { TodoProvider } from '@/src/components/providers/TodoProvider';

const TodosLayout = ({
  children,
  todo,
}: {
  children: React.ReactNode;
  todo: React.ReactNode;
}) => {
  return (
    <TodoProvider>
      {children}
      {todo}
    </TodoProvider>
  );
};

export default TodosLayout;
