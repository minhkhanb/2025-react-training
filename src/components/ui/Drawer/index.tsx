import {
  Drawer as DrawerCn,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@src/components/shadcn/ui/drawer';
import { Button } from '@src/components/shadcn/ui/button';

const Drawer = () => {
  return (
    <DrawerCn direction="right">
      <DrawerTrigger>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Drawer</DrawerTitle>
        <div>Drawer content</div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerCn>
  );
};

export default Drawer;
