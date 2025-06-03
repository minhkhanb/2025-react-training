import ActionTest from '@/section/ActionTest';
import { ApiResponse } from '@/section/Todo/types/common';
import { TodoValue } from '@/section/Todo/types/ITodoList';
import axios, { isAxiosError } from 'axios';
import React from 'react';
// import * as yup from 'yup';

export default function Page() {
  async function create(formData: FormData) {
    'use server';

    // const rawData = formDataToObject<TodoFormValues>(formData);

    try {
      //   use it if the api needs JSON data
      //   const todoFormData = parseTodoForm(formData);
      //   const validated = await todoSchema.validate(rawData, { abortEarly: false });

      //   const todoData: TodoValue = {
      //     id: '',
      //     title: validated.title,
      //     description: validated.description || '',
      //     dueDate: new Date(validated.dueDate),
      //     priority: validated.priority,
      //     status: 'todo',
      //   };

      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   const { id, ...newObj } = todoData;

      formData.append('status', 'todo');

      const res = await axios.post<ApiResponse<TodoValue>>(
        'http://localhost:5000/api/todos',
        formData
      );

      console.log(res.data);

      return { messages: 'Todo created successfully!' };
    } catch (error: unknown) {
      //   if (error instanceof yup.ValidationError) {
      //     return {
      //       messages: error.errors,
      //     };
      //   }

      if (isAxiosError(error)) {
        return {
          messages: error?.response?.data.message,
        };
      }

      return {
        messages: ['Unknown server error'],
      };
    }
  }

  return <ActionTest createItemAction={create} />;
}
