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
  onAnimationEnd?: () => void;
  children: React.ReactNode;
}

const Drawer = ({ visible = true, children, onClose, onAnimationEnd }: Props) => {
  return (
    <DrawerCn direction="right" open={visible} onClose={onClose} onAnimationEnd={onAnimationEnd}>
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
