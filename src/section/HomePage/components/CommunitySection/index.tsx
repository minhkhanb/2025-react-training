'use client';

import React, { use } from 'react';
import { Community } from '../../api/CommunityService';
import Image from 'next/image';

const CommunityCard = function CommunityCard({
  communityImageLink,
  title,
  description,
}: {
  communityImageLink: string;
  title: string;
  description: string;
}) {
  return (
    <div className="h-64 w-80 gap-2 rounded-lg px-8 py-6 shadow-md">
      <div className="flex w-full flex-wrap justify-center gap-4">
        <Image
          className="object-contain"
          src={communityImageLink}
          alt={title}
          width={65}
          height={56}
        />
        <p className="text-center text-3xl font-bold text-[#4D4D4D]">{title}</p>
      </div>
      <p className="text-center text-sm leading-5 font-normal text-[#717171]">{description}</p>
    </div>
  );
};

export default function CommunitySection({
  listcommunities,
}: {
  listcommunities: Promise<Community[]>;
}) {
  const communityCardList = use(listcommunities);

  return (
    <div className="my-10 flex flex-wrap justify-center gap-4">
      <div className="w-full">
        <h3 className="text-center text-3xl font-semibold text-[#4D4D4D] md:text-4xl">
          Manage your entire community in a single system
        </h3>
        <p className="mt-1 text-center text-base font-normal text-[#717171]">
          Who is Nextcent suitable for?
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-around gap-10">
        {communityCardList.map((item, index) => {
          return (
            <CommunityCard
              communityImageLink={item.communityImageLink}
              title={item.title}
              description={item.description}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
