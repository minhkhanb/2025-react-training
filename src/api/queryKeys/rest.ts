import { createQueryKeys } from '@lukemorales/query-key-factory';
import { tags } from '@src/api/common';
import { CoursesParams } from '@src/api/courses';

export const courseKeys = createQueryKeys(tags.rest.courses, {
  list: (apiArgs?: CoursesParams) => [{ apiArgs }],
  byId: (courseId: string) => [{ courseId }],
});
