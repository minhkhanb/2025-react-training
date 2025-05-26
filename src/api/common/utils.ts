// The mutate function of the optimistic update logic
import { MutationObserverOptions, QueryClient, QueryKey } from '@tanstack/react-query';

const optimisticArrayUpdateMutate = async <InputArray>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  newStatus: InputArray,
  indexKey: keyof typeof newStatus
) => {
  await queryClient.cancelQueries({
    queryKey,
  });

  const previousStatuses = queryClient.getQueryData<InputArray[]>(queryKey);

  if (!previousStatuses) {
    return;
  }

  const previousStatusIndex = previousStatuses.findIndex(
    status => status[indexKey] === newStatus[indexKey]
  );

  if (previousStatusIndex !== -1) {
    const newValues = [...previousStatuses];
    newValues[previousStatusIndex] = newStatus;
    queryClient.setQueryData(queryKey, newValues);
  }

  return previousStatuses;
};

// Optimistically update the state before performing the mutation.
// In this case that it fails, a refetch is triggered to revert them to their true state.
const optimisticArrayUpdateMutation = <ApiResponse, ErrorResponse, ApiRequest>(
  queryClient: QueryClient,
  queryKey: (request: ApiRequest) => QueryKey,
  indexKey: keyof ApiRequest
): Pick<
  MutationObserverOptions<ApiResponse, ErrorResponse, ApiRequest, ApiRequest[]>,
  'onError' | 'onSettled' | 'onMutate'
> => ({
  onSettled: (_data, _error, request) => {
    const key = queryKey(request);

    queryClient.invalidateQueries({ queryKey: key });
  },
  onMutate: async newValue => {
    const key = queryKey(newValue);

    return await optimisticArrayUpdateMutate<ApiRequest>(queryClient, key, newValue, indexKey);
  },
  onError: (_error, newStatus, context) => {
    queryClient.setQueryData(queryKey(newStatus), context);
  },
});

export { optimisticArrayUpdateMutation };
