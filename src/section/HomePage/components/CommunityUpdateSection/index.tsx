'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React, { use } from 'react';
import { CommunityUpdate } from '../../api/CommunityUpdateService';

const CommunityUpdateCard = function CommunityUpdateCard({ imageLink, caption }: CommunityUpdate) {
  return (
    <div className="relative h-[366px] w-[368px] shrink-0 rounded-lg">
      <Image
        src={imageLink}
        alt={'customer'}
        width={368}
        height={286}
        className="h-[78%] w-full rounded-lg object-cover"
      />
      <div className="absolute top-1/2 left-[7%] flex h-[48%] w-[86%] flex-col justify-between rounded-lg bg-[#F5F7FA] p-4 shadow-lg">
        <p className="text-center text-xl leading-7 font-semibold text-[#717171]">{caption}</p>
        <p className="cursor-pointer text-center text-xl font-semibold text-[#4CAF4F] hover:text-[#347136]">
          Readmore
          <ArrowRightOutlined className="ml-2" />
        </p>
      </div>
    </div>
  );
};

export default function CommunityUpdateSection({
  listCommunitiesUpdate,
}: {
  listCommunitiesUpdate: Promise<CommunityUpdate[]>;
}) {
  const communitiesUpdateList = use(listCommunitiesUpdate);

  return (
    <div className="my-5 flex flex-wrap gap-4 px-6 py-8">
      <div className="flex flex-wrap justify-center gap-2">
        <p className="w-full text-center text-3xl font-semibold text-[#4D4D4D] md:text-4xl">
          Caring is the new marketing
        </p>
        <p className="text-center text-base leading-6 font-normal text-[#717171]">
          The Nexcent blog is the best place to read about the latest membership insights, trends
          and more. See who&apos;s joining the community, read about how our community are
          increasing their membership income and lot&apos;s more.​
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-16 lg:flex-nowrap lg:px-36">
        {communitiesUpdateList.map((item, index) => (
          <CommunityUpdateCard imageLink={item.imageLink} key={index} caption={item.caption} />
        ))}
      </div>
    </div>
  );
}
