import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from '@src/components/FormField';
import { Task, useTask } from '@src/components/Providers/TaskProvider';
import Input from '@src/components/ui/Input';
import { toast } from '@src/modules/toast';
import { FormValues, taskSchema } from '@src/validattions/TaskSchema';
import { FormProvider, useForm } from 'react-hook-form';

const AddTaskForm = () => {
  const { addTask } = useTask();

  const methods = useForm<FormValues>({
    resolver: yupResolver(taskSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      subtitle: '',
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: FormValues) => {
    const task: Task = {
      id: new Date().toISOString(),
      isCompleted: false,
      title: data.title,
      subtitle: data.subtitle,
    };
    addTask(task);
    toast({ title: 'Success', message: 'Add Task Successfully', duration: 3000, type: 'success' });
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col items-end gap-2"
      >
        <FormField name="title" component={Input} placeholder="Title" />
        <FormField name="subtitle" component={Input} placeholder="Subtitle" />
        <button className="text-sm text-white bg-blue-300 px-4 py-2 rounded-md cursor-pointer">
          Update
        </button>
      </form>
    </FormProvider>
  );
};

export default AddTaskForm;
