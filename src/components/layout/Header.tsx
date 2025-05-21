import Link from 'next/link';
import Image from 'next/image';
import Logo from '@src/assets/images/logo.svg';
import { Button } from '@src/components/ui';

const Header = () => {
  return (
    <header className="line-b !fixed inset-x-0 top-0 z-20 h-32 flex items-center justify-between px-4 after:-bottom-px sm:px-6 lg:px-24 py-6 bg-[#49bbbd]">
      <Link className="shrink-0" href={'/'}>
        <Image src={Logo} alt="Logo" />
      </Link>

      <div className="flex items-center gap-5 max-md:hidden lg:gap-6">
        <Link href={'/'} className="text-sm/6 text-white">
          Home
        </Link>
        <Link href={'/courses'} className="text-sm/6 text-white">
          Courses
        </Link>
        <Link href={'/careers'} className="text-sm/6 text-white">
          Careers
        </Link>
        <Link href={'/blog'} className="text-sm/6 text-white">
          Blog
        </Link>
        <Link href={'/about-us'} className="text-sm/6 text-white">
          About Us
        </Link>
        <Button className="px-6 rounded-[80px] w-28 justify-center text-sm/6 font-normal bg-white hover:bg-white/90 text-[#5B5B5B]">
          Login
        </Button>
        <Button className="px-6 rounded-[80px] w-28 justify-center text-sm/6 font-normal bg-white/30 hover:bg-white/20 text-[#FFFFFF]">
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;
