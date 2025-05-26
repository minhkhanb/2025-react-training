import React from "react";
import {
  FormProviderContext,
  Handler,
} from "@/components/providers/FormProvider";
import FormField from "@/components/ui-custom/form-field";
import { Input } from "@/components/ui/input";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AddNewDialog = ({ visible, onClose }: Props) => {
  const handlers: Handler[] = [
    {
      title: "Create task",
      type: "submit",
    },
  ];

  return (
    <FormProviderContext
      title="Add new task"
      visible={visible}
      onClose={onClose}
      handlers={handlers}
      subtitle="Fill in the task details below and click save when you're done."
    >
      <div className="grid gap-4 py-4">
        <FormField label="Task Name" field="title" component={Input} />
        <FormField label="Description" field="subtitle" component={Input} />
      </div>
    </FormProviderContext>
  );
};

export default AddNewDialog;
