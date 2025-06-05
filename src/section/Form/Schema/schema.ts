import * as yup from 'yup';

export const formSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
  role: yup.string().required('Role is required'),
  consent: yup
    .boolean()
    .required('Consent is required')
    .oneOf([true], 'You must agree to the processing of your personal data'),
  phone: yup
    .string()
    .notRequired()
    .test(
      'is-valid-phone',
      'Invalid phone number',
      value => !value || /^\+?[1-9]\d{1,14}$/.test(value)
    ),
});
export type FormData = yup.InferType<typeof formSchema>;
