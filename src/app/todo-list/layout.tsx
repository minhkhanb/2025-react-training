import React from 'react';

export default function Layout({
  todo,
  children,
}: {
  todo: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {todo}
    </div>
  );
}
