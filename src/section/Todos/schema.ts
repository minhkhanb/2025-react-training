import * as yup from 'yup';

export const todoSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters'),
  subTitle: yup.string().required('SubTitle is required'),
  note: yup.string().notRequired(),
});

export type TodoData = yup.InferType<typeof todoSchema>;
