import { queryKeys } from "@/server/queryKeys";
import { getObjectsApi } from "@/server/user/objects";
import { type ObjectsInfo } from "@/server/user/objects.types";
import { useQuery } from "react-query";

export function useGetObjects() {
  const { data, isLoading, error } = useQuery<ObjectsInfo[], Error>(
    queryKeys.getObjects,
    getObjectsApi
  );

  return { objects: data, isLoading, error };
}
