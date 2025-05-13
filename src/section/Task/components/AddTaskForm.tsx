import { FormField } from '@src/components/FormField';
import { Task, useTask } from '@src/components/Providers/TaskProvider';
import Form from '@src/components/ui/Form';
import Input from '@src/components/ui/Input';
import { toast } from '@src/modules/toast';
import { FormValues, taskSchema } from '@src/validattions/TaskSchema';
import { UseFormReturn } from 'react-hook-form';

const AddTaskForm = () => {
  const { addTask } = useTask();

  const onSubmit = (data: FormValues, methods: UseFormReturn<FormValues>) => {
    const task: Task = {
      id: new Date().toISOString(),
      isCompleted: false,
      title: data.title,
      subtitle: data.subtitle,
    };
    addTask(task);
    methods.reset();
    toast({ title: 'Success', message: 'Add Task Successfully', duration: 3000, type: 'success' });
  };

  return (
    <Form
      className="space-y-6"
      onSubmit={onSubmit}
      validationSchema={taskSchema}
      mode="onChange"
      defaultValues={{ title: '', subtitle: '' }}
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
      <button
        type="submit"
        className="text-sm text-white bg-blue-300 px-4 py-2 rounded-md cursor-pointer"
      >
        Add Task
      </button>
    </Form>
  );
};

export default AddTaskForm;
