'use client';

import { CloudUploadOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';

export default function StartupPlan() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
            Deploy faster
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Everything you need
            <br className="hidden sm:inline" /> to deploy your app
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Deploy your web app in minutes with our easy-to-use platform. We handle the
            infrastructure so you can focus on building great products.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-16">
          {/* Feature 1 */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">
              <CloudUploadOutlined className="text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Push to deploy</h3>
              <p className="mt-2 text-gray-600">
                Deploy your app with a simple push to your repository. We&apos;ll handle the build
                process and deployment for you.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">
              <LockOutlined className="text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">SSL certificates</h3>
              <p className="mt-2 text-gray-600">
                Automatic SSL certificates for all your domains. Keep your users&apos; data secure
                HTTPS.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Simple queues</h3>
              <p className="mt-2 text-gray-600">
                Built-in queue system for background jobs. Process emails, webhooks, and more with
                ease.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Advanced security</h3>
              <p className="mt-2 text-gray-600">
                Enterprise-grade security features to protect your app and user data from threats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
