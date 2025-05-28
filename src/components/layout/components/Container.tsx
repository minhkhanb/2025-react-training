import React from 'react';

interface SectionHeader {
  scope: string;
  title: string;
  description?: string;
}

interface Props {
  header: SectionHeader;
  action: React.ReactNode;
  children: React.ReactNode;
}

const Container = ({ header, action, children }: Props) => {
  return (
    <div className="container py-6">
      <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-tight-widest text-gray-600 uppercase dark:text-gray-400">
        {header.scope}
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        {header.title}
      </h1>
      <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">{header.description}</p>

      <div className="prose mt-10">
        <div className="not-prose relative isolate scroll-mt-16">
          <div className="flex justify-end">{action}</div>
          <div className="w-full overflow-x-auto whitespace-nowrap">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Container;
