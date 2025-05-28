'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Drawer as DrawerCn,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@src/components/shadcn/ui/drawer';
import { X } from 'lucide-react';

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Drawer = ({ visible = false, children, onClose }: Props) => {
  const router = useRouter();

  React.useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && visible) {
        router.back();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [visible, router]);

  return (
    <DrawerCn direction="right" open={visible} onClose={onClose} onOpenChange={() => router.back()}>
      <DrawerContent>
        <DrawerHeader className="absolute top-0 right-0 flex flex-row justify-end">
          <DrawerTitle className="hidden">Title</DrawerTitle>
          <DrawerClose>
            <X className="cursor-pointer" />
          </DrawerClose>
        </DrawerHeader>
        <div className="px-4 py-8 sm:px-6 sm:py-12">{children}</div>
      </DrawerContent>
    </DrawerCn>
  );
};

export default Drawer;
