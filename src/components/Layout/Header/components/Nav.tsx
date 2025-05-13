import Link from 'next/link';
import React from 'react';

interface NavItem {
  name: string;
  route: string;
}

const Nav = () => {
  const navs: NavItem[] = [
    {
      name: 'Task Management',
      route: '/',
    },
    {
      name: 'About',
      route: '/about',
    },
    {
      name: 'Contact',
      route: '/contact',
    },
  ];
  return (
    <ul className="flex items-center translate-y-1 gap-4 text-sm font-medium text-[#2f2f2f]">
      {navs.map((nav, index) => (
        <li key={nav.name + index}>
          <Link href={nav.route}>{nav.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
