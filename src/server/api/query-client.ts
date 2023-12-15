import axios from "axios";
import { type QueryObserverOptions, QueryClient } from "react-query";
import { toast } from "react-toastify";

const defaultQueryConfig: QueryObserverOptions = {
  staleTime: 60000,
  retryOnMount: false,
  retry(failureCount, error) {
    return false;
  },
  onError: (error) => {
    let message = "Ошибка при загрузке объекта";
    if (axios.isAxiosError(error)) {
      message =
        error.response?.data &&
        typeof error.response?.data === "object" &&
        "message" in error.response?.data
          ? error.response.data.message
          : "Ошибка при загрузке объекта";
    }

    toast.error(message);
  },
  refetchOnMount: false,
  refetchOnWindowFocus: false,
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: defaultQueryConfig },
});
