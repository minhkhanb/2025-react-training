import Link from 'next/link';
import React from 'react';

export default function DashBoard() {
  return (
    <div>
      DashBoard <Link href={'/(.)login'}>login</Link>
    </div>
  );
}
