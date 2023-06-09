import { queryKeys } from "@/server/queryKeys";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import { type TError } from "@/types/shared.types";
import { useQuery } from "react-query";
import {
  getUserObjectsApi,
  getUserSingleObjectApi,
} from "@/server/objects/userObjectsApi";

export function useGetUserObjects() {
  const { data, isLoading, refetch, isFetching, error } = useQuery<
    ObjectsInfo[],
    TError
  >(queryKeys.getObjects, ({ signal }) => getUserObjectsApi({ signal }));

  return { objects: data, isLoading, refetch, isFetching, error };
}

export function useGetUserSelectedObject({
  id,
  enabled,
}: {
  id?: number | null;
  enabled: boolean;
}) {
  const { data, isLoading, refetch, isFetching, error } = useQuery<
    ObjectsInfo,
    TError
  >(
    queryKeys.getSingleObject,
    ({ signal }) => getUserSingleObjectApi({ signal, id }),
    { enabled }
  );

  return { object: data, isLoading, refetch, isFetching, error };
}
