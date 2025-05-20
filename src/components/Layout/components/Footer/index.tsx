'use client';

import { SendOutlined } from '@ant-design/icons';
import Link from 'next/link';
import LogoFooter from './Icons/LogoFooter';
import { RedirectLink, SocialIcons } from '../../api/footerServices';
import DynamicAntIcon from '@/components/DynamicAntIcon';
import { use } from 'react';

const SocialIcon = function SocialIcon({ link, title, Icon }: SocialIcons) {
  return (
    <a
      href={link}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(162,162,162,0.3)] text-white transition duration-150 hover:text-gray-300"
    >
      <span className="sr-only">{title}</span>
      <DynamicAntIcon iconName={Icon} />
    </a>
  );
};

const RedirectLinkComponent = function RedirectLink({ link, title }: RedirectLink) {
  return (
    <li>
      <Link href={link} className="text-gray-300 transition duration-150 hover:text-white">
        {title}
      </Link>
    </li>
  );
};

export const Footer = function Footer({
  SocialIcons,
  CompanyLinks,
  SupportLinks,
}: {
  SocialIcons: Promise<SocialIcons[]>;
  CompanyLinks: Promise<RedirectLink[]>;
  SupportLinks: Promise<RedirectLink[]>;
}) {
  const socialIcons = use(SocialIcons);
  const companyLinks = use(CompanyLinks);
  const supportLinks = use(SupportLinks);

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
              {socialIcons.map((item, index) => {
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
                {companyLinks.map((item, index) => (
                  <RedirectLinkComponent link={item.link} title={item.title} key={index} />
                ))}
              </ul>
            </div>

            <div className="">
              <h3 className="mb-4 text-xl font-semibold tracking-wider">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((item, index) => (
                  <RedirectLinkComponent link={item.link} title={item.title} key={index} />
                ))}
              </ul>
            </div>

            <div className="">
              <h3 className="mb-4 text-xl font-semibold tracking-wider">Stay up to date</h3>
              <div className="flex h-10 w-64 items-center justify-between rounded-xl bg-[rgba(162,162,162,0.3)] px-4">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Your email address"
                  className="outline-none"
                />
                <SendOutlined className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
