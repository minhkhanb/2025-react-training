'use client';

import React from 'react';
import Client1 from '../../icons/ClientIcon/client1';
import Client2 from '../../icons/ClientIcon/client2';
import Client3 from '../../icons/ClientIcon/client3';
import Client4 from '../../icons/ClientIcon/client4';
import Client5 from '../../icons/ClientIcon/client5';
import Client6 from '../../icons/ClientIcon/client6';
import Client7 from '../../icons/ClientIcon/client7';

export default function ClientSection() {
  const listClient = [
    { client: Client1 },
    { client: Client2 },
    { client: Client3 },
    { client: Client4 },
    { client: Client5 },
    { client: Client6 },
    { client: Client7 },
  ];

  return (
    <div className="my-10 flex flex-wrap justify-center gap-4 px-5 md:px-36">
      <div className="w-full">
        <h3 className="text-center text-4xl font-semibold text-[#4D4D4D]">Our Clients</h3>
        <p className="mt-1 text-center text-base font-normal text-[#717171]">
          We have been working with some Fortune 500+ clients
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between">
        {listClient.map((item, index) => (
          <item.client key={index} />
        ))}
      </div>
    </div>
  );
}
