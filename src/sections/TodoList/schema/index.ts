import * as z from 'zod';

export const validationSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must not exceed 100 characters')
    .regex(/^[a-zA-ZÀ-ỹ0-9\s]+$/, 'Title can only contain letters, numbers and spaces'),

  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),

  status: z.enum(['pending', 'in-progress', 'completed'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),

  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Invalid priority' }),
  }),

  dueDate: z
    .date({
      required_error: 'Due date is required',
      invalid_type_error: 'Invalid due date',
    })
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Due date must be from today onwards'),
});
