import { useQuery } from '@tanstack/react-query';
import { tags } from '@src/api/common/tags';

export const useGetCourses = () => {
  return useQuery({
    queryKey: [tags.rest.courses],
    queryFn: async () => {
      const response = await fetch('http://localhost:3500/images/');

      console.log('PDebug response:', response);

      return response.json();
    },
  });
};

// const useGetCourseById = (courseId: string) => {};
