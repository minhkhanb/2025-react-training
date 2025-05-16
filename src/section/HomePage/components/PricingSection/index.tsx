'use client';

import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

export default function PricingSection() {
  return (
    <div className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Pricing that grows with you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose the perfect plan for your needs. Start small and scale as your business grows. No
            hidden fees or long-term contracts.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-6 md:flex-nowrap">
          {/* Freelancer Plan */}
          <div className="flex grow flex-col justify-evenly rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Freelancer</h3>
            <p className="mt-2 text-gray-600">
              The essentials to provide your best work for clients.
            </p>

            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-bold tracking-tight text-gray-900">$19</span>
              <span className="ml-1 text-base font-medium text-gray-500">/month</span>
            </div>

            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">5 products</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Up to 1,000 subscribers</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Basic analytics</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">48-hour support response time</span>
              </li>
            </ul>

            <button className="mt-8 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-center text-base font-medium text-indigo-600 hover:bg-gray-50">
              Buy plan
            </button>
          </div>

          {/* Startup Plan */}
          <div className="flex grow flex-col justify-evenly rounded-lg border-2 border-indigo-600 bg-white p-6 shadow-md">
            <div className="mb-4 flex justify-between">
              <h3 className="text-xl font-semibold text-indigo-800">Startup</h3>
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-800">
                Most popular
              </span>
            </div>
            <p className="text-gray-600">A plan that scales with your rapidly growing business.</p>

            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-bold tracking-tight text-gray-900">$49</span>
              <span className="ml-1 text-base font-medium text-gray-500">/month</span>
            </div>

            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">25 products</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Up to 10,000 subscribers</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">24-hour support response time</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Marketing automation</span>
              </li>
            </ul>

            <button className="mt-8 block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-indigo-700">
              Buy plan
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="flex grow flex-col justify-evenly rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
            <p className="mt-2 text-gray-600">
              Dedicated support and infrastructure for your company.
            </p>

            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-bold tracking-tight text-gray-900">$99</span>
              <span className="ml-1 text-base font-medium text-gray-500">/month</span>
            </div>

            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Unlimited products</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Unlimited subscribers</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">1-hour, dedicated support response time</span>
              </li>
              <li className="flex items-center">
                <CheckOutlined
                  style={{ color: 'oklch(51.1% .262 276.966);' }}
                  className="h-5 w-5 flex-shrink-0"
                />
                <span className="ml-3 text-gray-600">Marketing automation</span>
              </li>
            </ul>

            <button className="mt-8 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-center text-base font-medium text-indigo-600 hover:bg-gray-50">
              Buy plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
