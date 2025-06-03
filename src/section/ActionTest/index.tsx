'use client';

import React, { useState } from 'react';
import ActionTestForm from './components/ActionTestForm';

export default function ActionTest({
  createItemAction,
}: {
  createItemAction: (formData: FormData) => Promise<{ messages?: string[] | string }>;
}) {
  const [messages, setMessages] = useState<string[] | string>([]);
  const [priority, setPriority] = useState<string>('');

  const handleFormAction = async (formData: FormData) => {
    formData.append('priority', priority);

    const res = await createItemAction(formData);

    if ('messages' in res && res.messages) {
      setMessages(res.messages);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-16">
      <h2 className="relative w-full text-center text-5xl leading-tight font-black tracking-wider md:text-6xl lg:text-7xl">
        <span className="absolute inset-0 animate-pulse bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
          Test Add Todo By Server Action
        </span>

        <span className="relative bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent drop-shadow-2xl">
          Test Add Todo By Server Action
        </span>

        <span className="absolute inset-0 bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-rose-300 bg-clip-text text-transparent opacity-30 blur-sm">
          Test Add Todo By Server Action
        </span>
      </h2>

      <div className="mt-8 h-1 w-32 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 shadow-lg shadow-fuchsia-500/25"></div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-bounce rounded-full bg-fuchsia-400 opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 h-1 w-1 animate-ping rounded-full bg-indigo-400 opacity-40"></div>
        {/* <div className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400 opacity-50"></div> */}
        <div className="absolute top-1/2 right-1/3 h-1 w-1 animate-bounce rounded-full bg-purple-400 opacity-30"></div>
      </div>

      <ActionTestForm
        messages={messages}
        handleFormAction={handleFormAction}
        priority={priority}
        setPriority={setPriority}
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 blur-3xl"></div>
      </div>
    </div>
  );
}
