'use client';

import React from 'react';
import Achievements1 from '../../icons/AchievementsIcon/Achievements1';
// import Achievements2 from '../../icons/AchievementsIcon/Achievements2';
import Achievements3 from '../../icons/AchievementsIcon/Achievements3';
import Achievements4 from '../../icons/AchievementsIcon/Achievements4';

export default function Achievements() {
  return (
    <div className="my-10 flex flex-wrap justify-between bg-[#f5f7fa] px-10 py-16 md:flex-nowrap md:px-36">
      <div className="flex w-1/2 flex-wrap gap-2">
        <h2 className="text-3xl font-semibold text-[#4D4D4D] md:text-4xl">
          Helping a local <br className="hidden md:flex" />
          <span className="text-[#4CAF4F]">business reinvent itself</span>
        </h2>
        <p className="text-base font-normal text-[#18191F]">
          We reached here with our hard work and dedication
        </p>
      </div>
      <div className="mt-5 flex flex-wrap justify-end gap-10 md:mt-0 md:w-1/2">
        <div className="flex w-full flex-wrap justify-between gap-7 md:flex-nowrap">
          <div className="flex w-1/2 gap-4">
            <Achievements1 />
            <div className="flex flex-wrap">
              <p className="w-full text-3xl font-bold text-[#4D4D4D]">2,245,341</p>
              <p className="w-full text-base font-normal text-[#717171]">Members</p>
            </div>
          </div>
          <div className="flex w-1/2 gap-4">
            <Achievements1 />
            <div className="flex flex-wrap">
              <p className="w-full text-3xl font-bold text-[#4D4D4D]">46,328</p>
              <p className="w-full text-base font-normal text-[#717171]">Clubs</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-between gap-7 md:flex-nowrap">
          <div className="flex w-1/2 gap-4">
            <Achievements3 />
            <div className="flex flex-wrap">
              <p className="w-full text-3xl font-bold text-[#4D4D4D]">828,867</p>
              <p className="w-full text-base font-normal text-[#717171]">Event Bookings</p>
            </div>
          </div>
          <div className="flex w-1/2 gap-4">
            <Achievements4 />
            <div className="flex flex-wrap">
              <p className="w-full text-3xl font-bold text-[#4D4D4D]">1,926,436</p>
              <p className="w-full text-base font-normal text-[#717171]">Payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
