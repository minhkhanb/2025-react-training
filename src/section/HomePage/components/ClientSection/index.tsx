'use client';

import React, { use } from 'react';
import Image from 'next/image';

export default function ClientSection({
  listClientIcons,
}: {
  listClientIcons: Promise<{ clientImageLink: string }[]>;
}) {
  const listClient = use(listClientIcons);

  return (
    <div className="my-10 flex flex-wrap justify-center gap-4 px-5 md:px-36">
      <div className="w-full">
        <h3 className="text-center text-4xl font-semibold text-[#4D4D4D]">Our Clients</h3>
        <p className="mt-1 text-center text-base font-normal text-[#717171]">
          We have been working with some Fortune 500+ clients
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between">
        {listClient.map((item, index) => {
          // const Icon = iconClientRegistry[item.Icon];

          // if (!Icon) return null;
          // return <Icon key={index} />;
          return (
            <Image
              className="object-contain"
              key={index}
              src={item.clientImageLink}
              alt={'Client'}
              width={48}
              height={48}
            />
          );
        })}
      </div>
    </div>
  );
}
