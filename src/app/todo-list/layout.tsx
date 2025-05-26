import { TodoProvider } from '@src/context/todoContext';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <TodoProvider>
      <div className="flex min-h-screen">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </TodoProvider>
  );
}
