import { Task, useTask } from '@src/components/Providers/TaskProvider';
import { FormValues, taskSchema } from '@src/validattions/TaskSchema';
import { FormField } from '@src/components/FormField';
import Input from '@src/components/ui/Input';
import Form from '@src/components/ui/Form';
import SubmitButton from '@src/components/ui/SubmitButton';

interface Props {
  onClose: () => void;
  task: Task | undefined;
}

const UpdateTaskForm = ({ task, onClose }: Props) => {
  const { handleUpdateTask, isUpdateLoading } = useTask();

  if (!task) return null;

  const onSubmit = (data: FormValues) => {
    const newTask: Task = {
      id: task.id,
      isComplete: task.isComplete,
      title: data.title,
      subtitle: data.subtitle,
    };
    handleUpdateTask(newTask);
    onClose();
  };

  return (
    <Form
      className="space-y-6"
      onSubmit={onSubmit}
      validationSchema={taskSchema}
      mode="onChange"
      defaultValues={{ title: task.title, subtitle: task.subtitle }}
    >
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
          Title
        </label>
        <div className="mt-2">
          <FormField name="title" component={Input} placeholder="Title" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
          Subtitle
        </label>
        <div className="mt-2">
          <FormField name="subtitle" component={Input} placeholder="Subtitle" />
        </div>
      </div>
      <SubmitButton>{isUpdateLoading ? 'Updating' : 'Update Task'}</SubmitButton>
    </Form>
  );
};

export default UpdateTaskForm;
