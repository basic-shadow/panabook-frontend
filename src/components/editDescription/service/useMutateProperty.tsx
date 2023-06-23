import { queryKeys } from "@/server/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import { type TError } from "@/types/shared.types";
import {
  putObjectRoomApi,
  putUserObjectApi,
} from "@/server/objects/userObjectsApi";
import {
  type PropertyRoom,
  type ObjectsInfo,
} from "@/server/objects/objects.types";

export function useMutateProperty() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isSuccess } = useMutation<
    void,
    TError,
    Partial<ObjectsInfo>
  >(putUserObjectApi, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.getSingleObject),
  });

  return { isLoading, mutateAsync, isSuccess };
}

export function useMutateRoom() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isSuccess } = useMutation<
    void,
    TError,
    Partial<PropertyRoom>
  >(putObjectRoomApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.getSingleObject);
    },
  });

  return { isLoading, mutateAsync, isSuccess };
}
