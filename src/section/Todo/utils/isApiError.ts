import { ApiResponse } from '../types/common';

export function isApiError<T>(error: unknown): error is ApiResponse<T> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).message === 'object'
  );
}
