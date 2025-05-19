'use client';

import {
  DribbbleOutlined,
  InstagramOutlined,
  SendOutlined,
  TwitterOutlined,
  YoutubeFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import LogoFooter from './Icons/LogoFooter';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

const SocialIcon = function SocialIcon({
  link,
  title,
  Icon,
}: {
  link: string;
  title: string;
  Icon: ForwardRefExoticComponent<Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>>;
}) {
  return (
    <a
      href={link}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(162,162,162,0.3)] text-white transition duration-150 hover:text-white"
    >
      <span className="sr-only">{title}</span>
      <Icon />
    </a>
  );
};

const RedirectLink = function RedirectLink({ link, title }: { link: string; title: string }) {
  return (
    <li>
      <Link href={link} className="text-gray-300 transition duration-150 hover:text-white">
        {title}
      </Link>
    </li>
  );
};

export const Footer = function Footer() {
  const listSocial = [
    { link: 'https://www.facebook.com/nhat3173', title: 'Instagram', Icon: InstagramOutlined },
    {
      link: 'https://github.com/nhattlm3173/HDW-TRAINING-NEXTJS',
      title: 'Dribbble',
      Icon: DribbbleOutlined,
    },
    { link: 'https://www.facebook.com/nhat3173', title: 'Twitter', Icon: TwitterOutlined },
    { link: 'https://www.facebook.com/nhat3173', title: 'Youtube', Icon: YoutubeFilled },
  ];

  const listCompanyLink = [
    { link: '/', title: 'About us' },
    { link: '/blog', title: 'Blog' },
    { link: '/docs', title: 'Contact us' },
    { link: '/showcase', title: 'Pricing' },
    { link: '/todo-list', title: 'Testimonials' },
  ];

  const listSupportLink = [
    { link: '/', title: 'Help center' },
    { link: '/blog', title: 'Terms of service' },
    { link: '/docs', title: 'Legal' },
    { link: '/showcase', title: 'Privacy policy' },
    { link: '/todo-list', title: 'Status' },
  ];

  return (
    <footer className="bg-[#263238] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <div className="col-span-1 grow md:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-white">
              <LogoFooter />
            </h2>
            <p className="mb-4 max-w-md text-gray-300">
              Copyright © {new Date().getFullYear()} Nexcent ltd. <br /> All rights reserved
            </p>
            <div className="flex space-x-4">
              {listSocial.map((item, index) => {
                return (
                  <SocialIcon key={index} link={item.link} title={item.title} Icon={item.Icon} />
                );
              })}
            </div>
          </div>

          <div className="flex grow-[2] flex-wrap justify-between gap-4 md:flex-nowrap">
            <div className="">
              <h3 className="mb-4 text-xl font-semibold tracking-wider">Company</h3>
              <ul className="space-y-2">
                {listCompanyLink.map((item, index) => (
                  <RedirectLink link={item.link} title={item.title} key={index} />
                ))}
              </ul>
            </div>

            <div className="">
              <h3 className="mb-4 text-xl font-semibold tracking-wider">Support</h3>
              <ul className="space-y-2">
                {listSupportLink.map((item, index) => (
                  <RedirectLink link={item.link} title={item.title} key={index} />
                ))}
              </ul>
            </div>

            <div className="">
              <h3 className="mb-4 text-xl font-semibold tracking-wider">Stay up to date</h3>
              <div className="flex h-10 w-64 items-center justify-between rounded-xl bg-[rgba(162,162,162,0.3)] px-4">
                <input type="text" name="" id="" placeholder="Your email address" />
                <SendOutlined className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
