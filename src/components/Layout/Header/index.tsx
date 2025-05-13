import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Brand from './components/Brand';
import Nav from './components/Nav';
import UserMenu from './components/UserMenu';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full h-[50px] shadow-md px-4">
      <Brand />
      <div className="flex items-center gap-4">
        <Nav />
        <UserMenu />
      </div>
    </div>
  );
};

export default Header;
