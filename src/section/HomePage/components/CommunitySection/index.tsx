'use client';

import React from 'react';
import Community1 from '../../icons/CommunityIcon/community1';
import Community2 from '../../icons/CommunityIcon/community2';
import Community3 from '../../icons/CommunityIcon/community3';

export default function CommunitySection() {
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
        <div className="h-64 w-80 gap-2 rounded-lg px-8 py-6 shadow-md">
          <div className="flex w-full flex-wrap justify-center gap-4">
            <Community1 />
            <p className="text-center text-3xl font-bold text-[#4D4D4D]">
              Membership Organisations
            </p>
          </div>
          <p className="text-center text-sm leading-5 font-normal text-[#717171]">
            Our membership management software provides full automation of membership renewals and
            payments
          </p>
        </div>
        <div className="h-64 w-80 gap-2 rounded-lg px-8 py-6 shadow-md">
          <div className="flex w-full flex-wrap justify-center gap-4">
            <Community2 />
            <p className="text-center text-3xl font-bold text-[#4D4D4D]">National Associations</p>
          </div>
          <p className="text-center text-sm leading-5 font-normal text-[#717171]">
            Our membership management software provides full automation of membership renewals and
            payments
          </p>
        </div>
        <div className="h-64 w-80 gap-2 rounded-lg px-8 py-6 shadow-md">
          <div className="flex w-full flex-wrap justify-center gap-4">
            <Community3 />
            <p className="text-center text-3xl font-bold text-[#4D4D4D]">Clubs And Groups</p>
          </div>
          <p className="text-center text-sm leading-5 font-normal text-[#717171]">
            Our membership management software provides full automation of membership renewals and
            payments
          </p>
        </div>
      </div>
    </div>
  );
}
