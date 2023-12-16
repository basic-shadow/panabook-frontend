import { type QueryObserverOptions, QueryClient } from "react-query";

const defaultQueryConfig: QueryObserverOptions = {
  staleTime: 60000,
  retryOnMount: false,
  retry(failureCount, error) {
    return false;
  },
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});
