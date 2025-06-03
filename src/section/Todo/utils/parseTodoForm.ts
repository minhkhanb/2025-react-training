import { TodoFormValues } from '../types/ITodoList';
import { isPriority } from './isPriority';

export function parseTodoForm(formData: FormData): TodoFormValues {
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');
  const priority = formData.get('priority');

  const fixedDate = new Date(typeof dueDate === 'string' ? dueDate : '');
  fixedDate.setHours(12);

  return {
    title: typeof title === 'string' ? title : '',
    description: typeof description === 'string' ? description : '',
    dueDate: fixedDate.toISOString(),
    priority: isPriority(priority) ? priority : '',
  };
}
