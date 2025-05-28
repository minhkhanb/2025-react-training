import { Drawer } from '@src/components/ui';
import AddCourseForm from '@src/section/Courses/components/AddCourseForm';

interface Props {
  visible: boolean;
  onClose?: () => void;
  onAnimationEnd?: () => void;
}

const AddCourseDrawer = ({ visible, onClose, onAnimationEnd }: Props) => {
  return (
    <Drawer visible={visible} onClose={onClose} onAnimationEnd={onAnimationEnd}>
      <AddCourseForm />
    </Drawer>
  );
};

export default AddCourseDrawer;
