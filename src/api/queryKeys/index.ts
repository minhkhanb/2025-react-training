import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { courseKeys } from '@src/api/queryKeys/rest';

export const queryKeys = mergeQueryKeys(courseKeys);
