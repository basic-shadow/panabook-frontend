import { queryKeys } from "@/server/queryKeys";
import {
  deleteObjectApi,
  getAllObjectsApi,
} from "@/server/objects/adminObjectsApi";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import { type TError } from "@/types/shared.types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useGetUser } from "./usersQuery";
import { adminEmails } from "@/shared/AuthLoadingLayer/AuthLoadingLayer";

export function useGetAllObjects({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  // USER DATA
  const { user } = useGetUser();

  const isAdmin = adminEmails.includes(user?.email ?? "");

  const { data, isLoading, isFetching, error } = useQuery<
    ObjectsInfo[],
    TError
  >(
    queryKeys.getObjects,
    ({ signal }) => getAllObjectsApi({ signal, page, limit }),
    { enabled: isAdmin }
  );

  return { objects: data, isLoading, isFetching, error };
}

export function useDeleteObject() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isSuccess } = useMutation<
    void,
    TError,
    number
  >(queryKeys.deleteObjects, deleteObjectApi, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.getObjects),
  });

  return { isLoading, mutateAsync, isSuccess };
}
