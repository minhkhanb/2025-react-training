import { useQuery } from '@tanstack/react-query';
import { tags } from '@src/api/common/tags';
import { useApiStore } from '@src/stores';
import { queryKeys } from '../queryKeys';
import axios from 'axios';
import { endpoints } from '@src/endpoints';
import { config } from '@src/config/envConfig';

export const useGetCourses = () => {
  return useQuery({
    queryKey: [tags.rest.courses],
    queryFn: async () => {
      const response = await fetch(`${config.REST_API_URL}/users/`);

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
