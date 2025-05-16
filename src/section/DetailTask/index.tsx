'use client';
import { Task } from '@src/components/Providers/TaskProvider';
import { getTaskById } from '@src/services/taskService';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DetailTask = () => {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (!id) return;
    const getTask = async () => {
      const taskFound = await getTaskById(id);
      setTask(taskFound);
    };
    getTask();
  }, [id]);

  if (!id) return;

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className=" text-4xl font-semibold">{task?.title}</h1>
      <p className="">{task?.subtitle}</p>
    </div>
  );
};

export default DetailTask;
