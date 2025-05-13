import Modal from '@src/components/Modal';

interface Props {
  title: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ConfirmModal = ({ title, visible, onClose, children }: Props) => {
  return (
    <Modal className="w-xs" title={title} visible={visible} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default ConfirmModal;
