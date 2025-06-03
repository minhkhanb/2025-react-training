'use client';

import { use, useState } from 'react';
import { BarsOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import LogoHeader from './Icons/LogoHeader';
import { HeaderContent } from '../../api/headerServices';
import { useRouter } from 'next/navigation';

const RedirectLink = function RedirectLink({ link, title }: HeaderContent) {
  return (
    <Link
      aria-label={title}
      href={link}
      className="px-3 py-2 text-base font-medium text-gray-600 transition duration-150 hover:text-gray-900"
    >
      {title}
    </Link>
  );
};

const RedirectLinkOnMobile = function RedirectLinkOnMobile({ link, title }: HeaderContent) {
  return (
    <Link
      aria-label={title}
      href={link}
      className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    >
      {title}
    </Link>
  );
};

export const Header = function Header({
  headerContents,
}: {
  headerContents: Promise<HeaderContent[]>;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerContent = use(headerContents);

  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:justify-evenly">
          <div className="flex flex-shrink-0 items-center">
            <Link
              aria-label="Home"
              href="/"
              className="text-xl font-bold text-blue-600 transition duration-150 hover:text-blue-800"
            >
              <LogoHeader />
            </Link>
          </div>

          <nav className="hidden space-x-8 lg:flex">
            {headerContent.map((item, index) => (
              <RedirectLink link={item.link} title={item.title} key={index} />
            ))}
          </nav>

          <div className="hidden gap-2 lg:flex">
            <button
              aria-label="Login"
              type="button"
              className="h-10 w-20 cursor-pointer rounded-md font-medium text-[#4CAF4F] transition-all hover:bg-gray-100 hover:text-[#2c862f]"
              onClick={() => {
                router.push('/login');
              }}
            >
              login
            </button>
            <button
              aria-label="Signup"
              type="button"
              className="h-10 w-24 cursor-pointer rounded-md bg-[#4CAF4F] font-medium text-white transition-all hover:bg-[#2c862f]"
            >
              Signup
            </button>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
              aria-label="Open menu"
            >
              {isMenuOpen ? <CloseOutlined /> : <BarsOutlined />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {headerContent.map((item, index) => (
                <RedirectLinkOnMobile link={item.link} title={item.title} key={index} />
              ))}
              <div className="flex flex-wrap gap-2">
                <button
                  aria-label="Login"
                  type="button"
                  className="h-10 w-full cursor-pointer rounded-md font-medium text-[#4CAF4F] transition-all hover:bg-gray-100 hover:text-[#2c862f]"
                >
                  login
                </button>
                <button
                  aria-label="Signup"
                  type="button"
                  className="h-10 w-full cursor-pointer rounded-md bg-[#4CAF4F] font-medium text-white transition-all hover:bg-[#2c862f]"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
