import * as yup from 'yup';

export const todoSchema = yup.object({
  title: yup.string().required('Title is required'),

  description: yup.string().optional(),

  dueDate: yup
    .date()
    .min(new Date(), 'Due date must be in the future')
    .required('Due date is required'),

  priority: yup
    .mixed<'low' | 'medium' | 'high'>()
    .oneOf(['low', 'medium', 'high'], 'Priority must be one of: low, medium, high')
    .required('Priority is required'),
});
