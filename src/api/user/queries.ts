import { useQuery } from '@tanstack/react-query';
import { tags } from '@src/api/common/tags';
import { useApiStore } from '@src/stores';
import { queryKeys } from '../queryKeys';
import axios from 'axios';
import { endpoints } from '@src/endpoints';

export const useGetCourses = () => {
  return useQuery({
    queryKey: [tags.rest.courses],
    queryFn: async () => {
      const response = await fetch('http://localhost:3002/api/v1/users/');

      console.log('PDebug response:', response);

      return response.json();
    },
  });
};

export const useListCourse = () => {
  const apiStore = useApiStore();

  return useQuery({
    queryKey: queryKeys[tags.rest.courses].list().queryKey,
    queryFn: async () => {
      return axios.get(apiStore.getEndpoint('rest', endpoints.user.list));
    },
  });
};
