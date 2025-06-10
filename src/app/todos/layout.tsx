import { TodoProviders } from '../providers';

export default function UsersLayout({
  children,
  todo,
}: {
  children: React.ReactNode;
  todo: React.ReactNode;
}) {
  return (
    <TodoProviders>
      {children}
      {todo}
    </TodoProviders>
  );
}
