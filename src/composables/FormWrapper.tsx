import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { taskSchema, FormValues } from '@/validattions/TaskSchema';

export const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<FormValues>({
    resolver: yupResolver(taskSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      subtitle: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
