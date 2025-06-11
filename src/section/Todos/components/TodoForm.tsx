'use client';

import React from 'react';
import { Label } from '@/src/components/shadcn/ui/label';
import { Textarea } from '@/src/components/shadcn/ui/textarea';
import { Button } from '@/src/components/shadcn/ui/button';
import { Input } from '@/src/components/shadcn/ui/input';

type FormProps = {
  buttonName: string;
  title: string;
  subTitle: string;
  note: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const TodoForm: React.FC<FormProps> = ({
  buttonName,
  title,
  subTitle,
  note,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subTitle">Sub Title</Label>
        <Input
          id="subTitle"
          name="subTitle"
          placeholder="Enter subtitle"
          value={subTitle}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          name="note"
          placeholder="Enter note"
          value={note}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="mt-4 w-full cursor-pointer">
        {buttonName}
      </Button>
    </form>
  );
};

export default TodoForm;
