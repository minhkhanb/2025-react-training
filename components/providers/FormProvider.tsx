/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskFormValues, taskSchema } from "@/validations/taskSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export interface Handler {
  title: string;
  fn?: any;
  type: "button" | "submit";
}

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  handlers: Handler[];
}

export function FormProviderContext({
  children,
  visible,
  onClose,
  title,
  handlers,
  subtitle,
}: Props) {
  const fields = useForm<TaskFormValues>({
    resolver: taskSchema && yupResolver(taskSchema),
    defaultValues: {
      title: "",
      subtitle: "",
    },
  });

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    console.log(data);
  };
  return (
    <FormProvider {...fields}>
      <Dialog
        open={visible}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
          </DialogHeader>
          <form onSubmit={fields.handleSubmit(onSubmit)}>
            {children}
            <DialogFooter>
              {handlers.map((handler) => (
                <Button
                  onClick={handler.fn}
                  key={handler.title}
                  type={handler.type}
                >
                  {handler.title}
                </Button>
              ))}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
