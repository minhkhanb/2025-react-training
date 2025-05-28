'use client';

import React from 'react';
import AddCourseDrawer from '@src/section/Courses/components/AddCourseDrawer';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [visible, setVisible] = React.useState(true);
  const router = useRouter();

  return (
    <AddCourseDrawer
      visible={visible}
      onClose={() => setVisible(false)}
      onAnimationEnd={() => router.push('/courses')}
    />
  );
}
