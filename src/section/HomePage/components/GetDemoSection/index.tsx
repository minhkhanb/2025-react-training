'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';

export default function GetDemoSection() {
  return (
    <div className="flex flex-wrap justify-center gap-8 bg-[#F5F7FA] py-8">
      <p className="w-full text-center text-5xl leading-20 font-semibold text-[#263238] md:text-6xl lg:w-2/4">
        Pellentesque suscipit fringilla libero eu.
      </p>
      <div className="flex w-full items-center justify-center">
        <button className="flex cursor-pointer items-center justify-center rounded-sm bg-[#4CAF4F] px-8 py-3.5 text-white transition hover:bg-[#478449]">
          Get a Demo <ArrowRightOutlined className="ml-2" />
        </button>
      </div>
    </div>
  );
}
