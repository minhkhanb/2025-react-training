import React from 'react';
import {
  useForm,
  Controller,
  FieldValues,
  Path,
  FieldError,
  DefaultValues,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormItem, FormLabel, FormControl, FormMessage } from '@src/components/ui/form';
import { Button } from '@src/components/ui/button';
import { cn } from '@src/lib/utils';

interface MainFormProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>;
  validationSchema: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
  children: React.ReactNode;
  className?: string;
}

export function MainForm<T extends FieldValues>({
  defaultValues,
  validationSchema,
  onSubmit,
  children,
  className,
}: MainFormProps<T>) {
  const formMethods = useForm<T>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  const handleSubmit: SubmitHandler<T> = async data => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(handleSubmit)}
        className={cn('space-y-6', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

interface FieldComponentProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  onBlur: () => void;
  name: string;
  error?: FieldError | boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FieldProps<T extends FieldValues, C = string> {
  name: Path<T>;
  component: React.ComponentType<FieldComponentProps<C>>;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

function Field<T extends FieldValues, C = string>({
  name,
  component: Component,
  label,
  required = false,
  className,
  disabled,
  placeholder,
  options,
  ...rest
}: FieldProps<T, C>) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const fieldId = `field-${name}`;
        const errorId = `${fieldId}-error`;

        return (
          <FormItem>
            {label && (
              <FormLabel htmlFor={fieldId}>
                {label} {required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <FormControl>
              <Component
                {...field}
                {...rest}
                disabled={disabled}
                placeholder={placeholder}
                options={options}
                className={cn(
                  'w-full transition-colors',
                  hasError && 'border-red-500 focus:border-red-500',
                  className
                )}
              />
            </FormControl>
            {hasError && <FormMessage id={errorId}>{fieldState.error?.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
}

interface SubmitButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

function SubmitButton({
  children = 'Submit',
  disabled,
  loading,
  className,
  variant = 'default',
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      variant={variant}
      className={cn('w-full', className)}
    >
      {loading ? 'Submitting...' : children}
    </Button>
  );
}

export const Form = {
  Field,
  SubmitButton,
};
