import Link from 'next/link';
import React from 'react';

export default function Team() {
  return (
    <div>
      Team
      <Link className="ml-10" href={'/dashboard/settings'}>
        Settings
      </Link>
    </div>
  );
}
