import { createQueryKeys } from '@lukemorales/query-key-factory';
import { tags } from '@src/api/common';
import { UserParams } from '../user';

export const courseKeys = createQueryKeys(tags.rest.courses, {
  list: (apiArgs?: UserParams) => [{ apiArgs }],
  byId: (courseId: string) => [{ courseId }],
});
