import { Drawer } from '@src/components/ui';
import AddUserForm from '@src/section/User/components/AddUserForm';

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const AddUserDrawer = ({ visible, onClose }: Props) => {
  return (
    <Drawer visible={visible} onClose={onClose}>
      <AddUserForm />
    </Drawer>
  );
};

export default AddUserDrawer;
