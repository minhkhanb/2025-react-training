'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CalenderSection() {
  return (
    <div className="mb-7 flex min-h-[70vh] items-center justify-between gap-8 p-6 pb-2 sm:p-12 sm:pb-2 md:p-20 md:pb-2 lg:px-36 lg:pb-2">
      <div className="hidden lg:flex">
        <Image
          className="object-contain"
          src={'/images/calender-image.png'}
          alt={'Calender'}
          width={441}
          height={133}
        />
      </div>
      <main className="row-start-2 flex flex-grow flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h2 className="text-3xl font-semibold text-[#4D4D4D] md:text-4xl">
          How to design your site footer like we did
        </h2>
        <p className="max-w-xl text-sm font-normal text-[#717171]">
          Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt
          molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at
          libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at
          porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna
          tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent
          felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus
          ipsum id gravida.
        </p>
        <Link
          href="/todo-list"
          className="mt-4 flex h-14 w-40 items-center justify-center rounded bg-[#4CAF4F] px-8 py-3.5 text-white transition hover:bg-[#478449]"
        >
          Learn More
        </Link>
      </main>
    </div>
  );
}
