import Modal from '@src/components/Modal';
import React from 'react';
import AddTaskForm from './AddTaskForm';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AddTaskModal = ({ visible, onClose }: Props) => {
  return (
    <Modal title="Add New Task" visible={visible} onClose={onClose}>
      <AddTaskForm />
    </Modal>
  );
};

export default AddTaskModal;
