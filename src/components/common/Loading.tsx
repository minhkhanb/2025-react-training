import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <span className="relative flex h-10 w-10">
        <span
          className="
            absolute inline-flex h-full w-full rounded-full
            border-4 border-solid border-gray-200
            border-t-blue-500
            animate-spin
          "
        ></span>
        <span className="sr-only">Loading...</span>
      </span>
    </div>
  );
}
