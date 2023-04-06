import { type QueryObserverOptions, QueryClient } from "react-query";

const defaultQueryConfig: QueryObserverOptions = {
  staleTime: 60000,
  retryOnMount: false,
  retry(failureCount, error) {
    if (failureCount > 1) {
      return false;
    }
    return true;
  },
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});
