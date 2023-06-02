import { queryKeys } from "@/server/queryKeys";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import { type TError } from "@/types/shared.types";
import { useQuery } from "react-query";
import { getObjectsApi } from "@/server/objects/objectsApi";

export function useGetUserObjects() {
  const { data, isLoading, refetch, isFetching, error } = useQuery<
    ObjectsInfo[],
    TError
  >(queryKeys.getObjects, ({ signal }) => getObjectsApi({ signal }));

  return { objects: data, isLoading, refetch, isFetching, error };
}
