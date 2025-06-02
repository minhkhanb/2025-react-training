/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSignUpMutation } from "@/api/auth/mutations/useSignUpMutation";
import { useAuth } from "@/components/providers/AuthProvider";
import { FormProvider } from "@/components/providers/FormProvider";
import ButtonCustomize from "@/components/ui-custom/button";
import FormField from "@/components/ui-custom/form-field";
import { Spinner } from "@/components/ui-custom/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/core/instances/query";
import { signUpSchema } from "@/core/validations/authSchema";
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const SignUpFormContent = () => {
  const { setUser } = useAuth();

  const router = useRouter();

  const { mutateAsync, isPending } = useSignUpMutation({
    onError: (error) => toast("Error", { description: error.message }),
    onSuccess: (res) => {
      toast("Success", { description: res.message });
      setUser(res.data);
      router.push("/");
    },
  });

  const onSubmit = async (value: any) => {
    await mutateAsync({ ...value });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-semibold text-3xl">ToDo</h1>
      <p>Create an Account</p>
      <FormProvider
        validationSchema={signUpSchema}
        defaultValues={{
          email: "",
          password: "",
          fullName: "",
        }}
        mode="onChange"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col w-xs">
          <Label className="text-right flex items-start text-xs text-gray-500">
            Email Address
          </Label>
          <FormField
            field="email"
            className="shadow-none border-b-1 focus-visible:ring-0 p-0 border-gray-300 border-t-0 border-l-0 rounded-none border-r-0"
            component={Input}
            placeholder="Enter email address"
          />
        </div>
        <div className="flex flex-col w-xs mt-4">
          <Label className="text-right flex items-start text-xs text-gray-500">
            Full Name
          </Label>
          <FormField
            field="fullName"
            className="shadow-none border-b-1 focus-visible:ring-0 p-0 border-gray-300 border-t-0 border-l-0 rounded-none border-r-0"
            component={Input}
            placeholder="Enter full name"
          />
        </div>
        <div className="flex flex-col mt-4">
          <Label className="text-right flex items-start text-xs text-gray-500">
            Password
          </Label>
          <FormField
            field="password"
            type="password"
            className="shadow-none border-b-1 focus-visible:ring-0 p-0 border-gray-300 border-t-0 border-l-0 rounded-none border-r-0"
            component={Input}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-center mt-4">
          <ButtonCustomize
            type="submit"
            className="font-semibold rounded-full w-40 cursor-pointer"
          >
            {isPending ? <Spinner /> : "Sign Up"}
          </ButtonCustomize>
        </div>
      </FormProvider>
      <ButtonCustomize
        onClick={() => router.push("/")}
        type="button"
        className="text-xs bg-0 border-0 hover:bg-0 shadow-none text-gray-500 cursor-pointer"
      >
        I already have an account. Login
      </ButtonCustomize>
    </div>
  );
};

const SignUpForm = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUpFormContent />
    </QueryClientProvider>
  );
};

export default SignUpForm;
