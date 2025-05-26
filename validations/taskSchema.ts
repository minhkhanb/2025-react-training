import * as yup from "yup";

export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
});

export type TaskFormValues = yup.InferType<typeof taskSchema>;
