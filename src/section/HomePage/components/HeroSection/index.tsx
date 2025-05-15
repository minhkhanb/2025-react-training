'use client';

import Link from 'next/link';
import React from 'react';
import HeroIcon from '../../icons/HeroIcon';

export default function HeroSection() {
  return (
    <div className="flex min-h-[70vh] flex-wrap items-center justify-between gap-8 bg-[#F5F7FA] p-6 pb-2 sm:p-12 sm:pb-2 md:p-20 md:pb-2 lg:px-32 lg:pb-2">
      <main className="row-start-2 flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h2 className="text-4xl font-semibold text-[#4D4D4D] md:text-6xl">
          Lessons and insights <br /> <span className="text-[#4CAF4F]">from 8 years</span>
        </h2>
        <p className="max-w-xl font-normal text-[#717171]">
          Where to grow your business as a photographer: site or social media?
        </p>
        <Link
          href="/todo-list"
          className="mt-4 flex h-12 w-32 items-center justify-center rounded bg-[#4CAF4F] px-6 py-3 text-white transition hover:bg-[#478449]"
        >
          Register
        </Link>
      </main>
      <div className="hidden lg:flex">
        <HeroIcon />
      </div>
      <div className="flex h-4 w-full items-center justify-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-[#4CAF4F]"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-[#4CAF4F] opacity-30"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-[#4CAF4F] opacity-30"></div>
      </div>
    </div>
  );
}
