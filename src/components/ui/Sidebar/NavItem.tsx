'use client';

import Link from 'next/link';

const NavItem = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-muted transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
};

export default NavItem;
