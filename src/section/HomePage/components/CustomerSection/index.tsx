'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Customer1 from '../../icons/CustomerIcon/customer1';
import Customer2 from '../../icons/CustomerIcon/customer2';
import Customer3 from '../../icons/CustomerIcon/customer3';
import Customer4 from '../../icons/CustomerIcon/customer4';
import Customer5 from '../../icons/CustomerIcon/customer5';
import Customer6 from '../../icons/CustomerIcon/customer6';
import { ArrowRightOutlined } from '@ant-design/icons';

type customer = {
  imageLink: string;
  customer: React.JSX.Element;
  description: string;
  author: string;
  position: string;
};

export default function CustomerSection() {
  const listCustomer: customer[] = [
    {
      imageLink: '/images/CustomerImg.jpg',
      customer: <Customer1 />,
      description:
        'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.',
      author: 'Tim Smith',
      position: 'British Dragon Boat Racing Association',
    },
    {
      imageLink: '/images/CustomerImg.jpg',
      customer: <Customer2 />,
      description:
        'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.',
      author: 'Tim Smuth',
      position: 'British Dragon Boat Racing Association',
    },
    {
      imageLink: '/images/CustomerImg.jpg',
      customer: <Customer3 />,
      description:
        'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.',
      author: 'Tom Smith',
      position: 'British Dragon Boat Racing Association',
    },
    {
      imageLink: '/images/CustomerImg.jpg',
      customer: <Customer4 />,
      description:
        'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.',
      author: 'Tam Smith',
      position: 'British Dragon Boat Racing Association',
    },
    {
      imageLink: '/images/CustomerImg.jpg',
      customer: <Customer5 />,
      description:
        'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.',
      author: 'Tem Smith',
      position: 'British Dragon Boat Racing Association',
    },
    {
      imageLink: '/images/CustomerImg.jpg',
      customer: <Customer6 />,
      description:
        'Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus ac sit amet magna.',
      author: 'Tum Smith',
      position: 'British Dragon Boat Racing Association',
    },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState<customer>(listCustomer[0]);

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
            {listCustomer.map((item, index) => (
              <div className="cursor-pointer" onClick={() => setSelectedCustomer(item)} key={index}>
                {item.customer}
              </div>
            ))}
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
