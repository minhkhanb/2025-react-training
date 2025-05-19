'use client';

import React, { use } from 'react';
import { Achievement } from '../../api/AchievementService';

const AchievementItem = function AchievementItem({
  Icon,
  total,
  title,
}: {
  Icon: React.JSX.ElementType;
  total: string;
  title: string;
}) {
  return (
    <div className="flex w-full gap-4 md:w-1/2">
      <Icon />

      <div className="flex flex-wrap">
        <p className="w-full text-3xl font-bold text-[#4D4D4D]">{total}</p>

        <p className="w-full text-base font-normal text-[#717171]">{title}</p>
      </div>
    </div>
  );
};

export default function Achievements({
  listAchievements,
}: {
  listAchievements: Promise<Achievement[]>;
}) {
  const AchievementsList = use(listAchievements);

  return (
    <div className="my-10 flex flex-wrap justify-between gap-2.5 bg-[#f5f7fa] px-10 py-16 lg:flex-nowrap lg:px-36">
      <div className="flex flex-wrap gap-2 md:w-1/2">
        <h2 className="text-3xl font-semibold text-[#4D4D4D] md:text-4xl">
          Helping a local <br className="hidden md:flex" />
          <span className="text-[#4CAF4F]">business reinvent itself</span>
        </h2>

        <p className="text-base font-normal text-[#18191F]">
          We reached here with our hard work and dedication
        </p>
      </div>
      <div className="mt-5 flex flex-wrap justify-end gap-10 lg:mt-0 lg:w-1/2">
        <div className="flex w-full flex-wrap justify-between gap-y-10">
          {AchievementsList.map((item, index) => (
            <AchievementItem Icon={item.icon} key={index} total={item.total} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
