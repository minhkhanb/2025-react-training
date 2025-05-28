import { Drawer } from '@src/components/ui';
import AddCourseForm from '@src/section/Courses/components/AddCourseForm';

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const AddCourseDrawer = ({ visible, onClose }: Props) => {
  return (
    <Drawer visible={visible} onClose={onClose}>
      <AddCourseForm />
    </Drawer>
  );
};

export default AddCourseDrawer;
