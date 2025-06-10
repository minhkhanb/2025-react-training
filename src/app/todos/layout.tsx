import { TodoProviders } from '../providers';

const TodosLayout = ({
  children,
  todo,
}: {
  children: React.ReactNode;
  todo: React.ReactNode;
}) => {
  return (
    <TodoProviders>
      {children}
      {todo}
    </TodoProviders>
  );
};

export default TodosLayout;
