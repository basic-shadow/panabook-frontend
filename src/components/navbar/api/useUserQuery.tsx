import { queryKeys } from "@/server/queryKeys";
import { logoutUserApi } from "@/server/user/user_info";
import { useMutation, useQueryClient } from "react-query";
import { type TError } from "@/types/shared.types";

export function useLogoutUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isSuccess } = useMutation<void, TError, void>(
    logoutUserApi,
    {
      onSuccess: () => queryClient.invalidateQueries(queryKeys.getUser),
    }
  );

  return { isLoading, mutateAsync, isSuccess };
}
