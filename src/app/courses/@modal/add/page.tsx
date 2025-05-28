'use client';

import React from 'react';
import AddCourseDrawer from '@src/section/Courses/components/AddCourseDrawer';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [visible, setVisible] = React.useState(true);
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!visible && shouldRedirect) {
      const timeout = setTimeout(() => {
        router.refresh();
        router.push('/courses');
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [visible, shouldRedirect, router]);

  const onClose = () => {
    setVisible(false);
    setShouldRedirect(true);
  };

  return <AddCourseDrawer visible={visible} onClose={onClose} />;
}
