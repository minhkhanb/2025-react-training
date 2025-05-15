'use client';
import { Task } from '@src/components/Providers/TaskProvider';
import { getTaskBySlug } from '@src/services/taskService';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DetailTask = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (!slug) return;
    const getTask = async () => {
      const taskFound = await getTaskBySlug(slug);
      setTask(taskFound);
    };
    getTask();
  }, [slug]);

  if (!slug) return;

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className=" text-4xl font-semibold">{task?.title}</h1>
      <p className="">{task?.subtitle}</p>
    </div>
  );
};

export default DetailTask;
