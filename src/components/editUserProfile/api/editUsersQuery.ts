import { queryKeys } from "@/server/queryKeys";
import { updateUserApi } from "@/server/user/user_info";
import { useMutation, useQueryClient } from "react-query";
import { type EditUserProfileInfo } from "../types/editUserProfile.types";
import { type TError } from "@/types/shared.types";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isSuccess } = useMutation<
    void,
    TError,
    EditUserProfileInfo
  >(queryKeys.updateUser, updateUserApi, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.getUser),
  });

  return { isLoading, mutateAsync, isSuccess };
}
