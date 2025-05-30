/* eslint-disable @typescript-eslint/no-explicit-any */
import useAddTaskMutation from "@/api/todo/mutations/useAddTaskMutation";
import { FormProvider } from "@/components/providers/FormProvider";
import ButtonCustomize from "@/components/ui-custom/button";
import FormField from "@/components/ui-custom/form-field";
import { SelectCustomize } from "@/components/ui-custom/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { taskSchema } from "@/core/validations/taskSchema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

const AddTaskForm = ({ onClose }: Props) => {
  const { mutateAsync, isPending } = useAddTaskMutation({
    onSuccess: (data) => {
      toast("Success", { description: data.message });
    },
    onError: (error) => {
      toast("Error", { description: error.message });
    },
  });

  const options = [
    { label: "Hard", value: "hard" },
    { label: "Medium", value: "medium" },
    { label: "Easy", value: "easy" },
  ];

  const onSubmit = async (value: any, fields: UseFormReturn) => {
    await mutateAsync({ ...value });
    fields.reset();
    onClose();
  };
  return (
    <FormProvider
      onSubmit={onSubmit}
      defaultValues={{
        title: "",
        subtitle: "",
        level: "",
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
        <FormField label="Priority" field="level" component={Checkbox} />
        <div className="grid grid-cols-3">
          <ButtonCustomize
            type="submit"
            className="col-start-3 col-span-1 bg-green-500 hover:bg-green-400"
            isPending={isPending}
          >
            Create Task
          </ButtonCustomize>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddTaskForm;
