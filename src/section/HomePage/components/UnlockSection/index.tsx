'use client';

import React from 'react';
import UnlockIcon from '../../icons/UnlockIcon';
import Link from 'next/link';

export default function UnlockSection() {
  return (
    <div className="flex min-h-[70vh] items-center justify-between gap-8 p-6 pb-2 sm:p-12 sm:pb-2 md:p-20 md:pb-2 lg:px-36 lg:pb-2">
      <div className="hidden lg:flex">
        <UnlockIcon />
      </div>
      <main className="row-start-2 flex flex-grow flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h2 className="text-3xl font-semibold text-[#4D4D4D] md:text-4xl">
          The unseen of spending three years at Pixelgrade
        </h2>
        <p className="max-w-xl text-sm font-normal text-[#717171]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet justo ipsum. Sed
          accumsan quam vitae est varius fringilla. Pellentesque placerat vestibulum lorem sed
          porta. Nullam mattis tristique iaculis. Nullam pulvinar sit amet risus pretium auctor.
          Etiam quis massa pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
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
