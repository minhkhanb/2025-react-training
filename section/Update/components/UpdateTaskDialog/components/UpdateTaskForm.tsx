/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FormField from "@/components/ui-custom/form-field";
import { Input } from "@/components/ui/input";
import { SelectCustomize } from "@/components/ui-custom/select";
import { taskSchema } from "@/core/validations/taskSchema";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import ButtonCustomize from "@/components/ui-custom/button";
import { FormProvider } from "@/components/providers/FormProvider";
import { Task } from "@/components/providers/TaskProvider";
import useUpdateTaskMutation from "@/api/todo/mutations/useUpdateTaskMutation";

interface Props {
  currentTask: Task;
  onClose: () => void;
}

const UpdateTaskForm = ({ currentTask, onClose }: Props) => {
  const { mutateAsync, isPending } = useUpdateTaskMutation({
    onSuccess: (data) => {
      toast("Success", { description: data.message });
    },
    onError: (error) => {
      toast("Error", { description: error.message });
    },
  });

  if (!currentTask) return;

  const options = [
    { label: "Hard", value: "hard" },
    { label: "Medium", value: "medium" },
    { label: "Easy", value: "easy" },
  ];

  const onSubmit = async (value: any, fields: UseFormReturn) => {
    await mutateAsync({
      ...currentTask,
      title: value.title,
      subtitle: value.subtitle,
      level: value.level,
    });
    fields.reset();
    onClose();
  };

  return (
    <FormProvider
      onSubmit={onSubmit}
      defaultValues={{
        title: currentTask.title,
        subtitle: currentTask.subtitle,
        level: currentTask.level,
      }}
      mode="onChange"
      validationSchema={taskSchema}
    >
      <div className="grid gap-4 py-4">
        <FormField
          placeholder="Enter title"
          label="Title"
          field="title"
          component={Input}
        />
        <FormField
          placeholder="Enter subtitle"
          label="Description"
          field="subtitle"
          component={Input}
        />
        <FormField
          label="Priority"
          field="level"
          component={SelectCustomize}
          options={options}
          placeholder="Choose Priority"
        />
        <div className="grid grid-cols-3">
          <ButtonCustomize
            type="submit"
            className="col-start-3 col-span-1 bg-blue-500 hover:bg-blue-400"
            isPending={isPending}
          >
            Update Task
          </ButtonCustomize>
        </div>
      </div>
    </FormProvider>
  );
};

export default UpdateTaskForm;
