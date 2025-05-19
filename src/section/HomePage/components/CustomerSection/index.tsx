'use client';

import Image from 'next/image';
import React, { use, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Customer } from '../../api/CustomerService';
import { iconCustomerRegistry } from '../../icons/CustomerIcon/IconRegistry';

export default function CustomerSection({ listCustomers }: { listCustomers: Promise<Customer[]> }) {
  const listCustomer = use(listCustomers);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(listCustomer[0]);

  return (
    <div className="flex items-start justify-center gap-7 bg-[#F5F7FA] px-6 py-8 lg:items-center lg:gap-20 lg:px-36">
      <Image
        src={selectedCustomer.imageLink}
        alt={'customer'}
        width={326}
        height={326}
        className="hidden h-80 w-80 shrink-0 rounded-lg object-cover md:flex"
      />
      <div className="flex flex-wrap gap-8">
        <div className="flex flex-wrap gap-4">
          <p className="text-center text-base leading-6 font-medium text-[#717171] md:text-start">
            {selectedCustomer.description}
          </p>
          <div className="flex w-full flex-wrap gap-2">
            <p className="w-full text-xl font-semibold text-[#4CAF4F]">{selectedCustomer.author}</p>
            <p className="w-full text-base font-normal text-[#89939E]">
              {selectedCustomer.position}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-2.5 lg:flex-row">
          <div className="flex grow flex-wrap justify-between gap-3 md:gap-10">
            {listCustomer.map((item, index) => {
              const Icon = iconCustomerRegistry[item.customer];

              return (
                <div
                  className="cursor-pointer"
                  onClick={() => setSelectedCustomer(item)}
                  key={index}
                >
                  <Icon />
                </div>
              );
            })}
          </div>
          <div className="flex grow items-center justify-center p-2">
            <p className="cursor-pointer text-xl leading-5 font-semibold text-[#4CAF4F] hover:text-[#347136]">
              Meet all customers
              <ArrowRightOutlined className="ml-1.5" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
