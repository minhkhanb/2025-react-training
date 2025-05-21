import Login from '@/section/Login';
import React from 'react';

export default function Page() {
  return (
    <div className="fixed top-0 z-10 h-dvh w-dvw bg-[rgba(147,145,145,0.3)]">
      <div className="fixed top-1/3 left-2/5 z-20 h-96 w-96">
        <Login />
      </div>
    </div>
  );
}
