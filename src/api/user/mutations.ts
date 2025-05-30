import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { CreateUserInput } from '@src/api/user/types';
import { useApiStore } from '@src/stores';
import { endpoints } from '@src/endpoints';

export const useCreateUser = () => {
  const apiStore = useApiStore();

  return useMutation<AxiosResponse, AxiosError, CreateUserInput>({
    mutationFn: ({ payload }) =>
      axios.post(apiStore.getEndpoint('rest', endpoints.user.create()), payload),
    onSuccess: data => {
      console.log('PDebug user created successfully:', data);
    },
    onError: error => {
      console.log('PDebug error creating user:', error);
    },
  });
};
