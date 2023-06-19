import { queryKeys } from "@/server/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import { type TError } from "@/types/shared.types";
import { putUserObjectApi } from "@/server/objects/userObjectsApi";
import { type ObjectsInfo } from "@/server/objects/objects.types";

export function useMutateProperty() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isSuccess } = useMutation<
    void,
    TError,
    ObjectsInfo
  >(putUserObjectApi, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.getSingleObject),
  });

  return { isLoading, mutateAsync, isSuccess };
}
