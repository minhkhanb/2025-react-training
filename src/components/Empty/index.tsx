import Image from 'next/image';
import React from 'react';

interface Props {
  title: string;
  subtitle: string;
}

const Empty = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2 mt-8 mb-16">
      <Image src="/empty-state.png" alt="No Designs" width={200} height={300} className="mb-3" />
      <h1 className={`text-xl font-semibold text-gray-500`}>{title}</h1>
      <span className={`text-base`}>{subtitle}</span>
    </div>
  );
};

export default Empty;
