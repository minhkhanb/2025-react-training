import { Task, useTask } from '@src/components/Providers/TaskProvider';
import { FormValues, taskSchema } from '@src/validattions/TaskSchema';
import { toast } from '@src/modules/toast';
import { FormField } from '@src/components/FormField';
import Input from '@src/components/ui/Input';
import Button from '@src/components/ui/Button';
import Form from '@src/components/ui/Form';

const UpdateTaskForm = ({ task }: { task: Task | undefined }) => {
  const { updateTask } = useTask();

  const onSubmit = (data: FormValues) => {
    if (!task) return;
    const newTask: Task = {
      id: task.id,
      isCompleted: task.isCompleted,
      title: data.title,
      subtitle: data.subtitle,
    };
    updateTask(newTask);
    toast({
      title: 'Success',
      message: 'Update Task Successfully',
      type: 'success',
      duration: 3000,
    });
  };

  return (
    <Form
      className="space-y-6"
      onSubmit={onSubmit}
      validationSchema={taskSchema}
      mode="onChange"
      defaultValues={{ title: task?.title, subtitle: task?.subtitle }}
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
      <Button>Update Task</Button>
    </Form>
  );
};

export default UpdateTaskForm;
