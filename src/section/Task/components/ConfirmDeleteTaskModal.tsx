import ConfirmModal from '@src/components/common/ConfirmModal';
import { Task, useTask } from '@src/components/Providers/TaskProvider';
import { toast } from '@src/modules/toast';

interface Props {
  visible: boolean;
  onClose: () => void;
  task?: Task;
}

const ConfirmDeleteTaskModal = ({ visible, onClose, task }: Props) => {
  const { handleRemoveTask } = useTask();

  if (!task) return;

  const handleDeleteTask = () => {
    handleRemoveTask(task.id);
    toast({
      title: 'Success',
      message: 'Delete Task Successfully',
      type: 'success',
      duration: 3000,
    });
    onClose();
  };

  return (
    <ConfirmModal title="Confirmation" visible={visible} onClose={onClose}>
      <div className="w-full h-full flex flex-col items-end gap-2">
        <p className="w-full text-sm">Are you sure about delete this task?</p>
        <div className="flex w-full justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white bg-red-500 px-4 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTask}
            type="submit"
            className="text-sm text-white bg-blue-300 px-4 py-2 rounded-md cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </ConfirmModal>
  );
};

export default ConfirmDeleteTaskModal;
