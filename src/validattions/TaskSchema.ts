import * as yup from 'yup';

export const taskSchema = yup.object({
  title: yup.string().required('Task name is required'),
  subtitle: yup.string().required('Task description is required'),
});

export type FormValues = yup.InferType<typeof taskSchema>;
