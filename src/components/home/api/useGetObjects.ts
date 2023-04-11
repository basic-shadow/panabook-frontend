import { queryKeys } from "@/server/queryKeys";
import { getObjectsApi } from "@/server/user/objects";
import { type ObjectsInfo } from "@/server/user/objects.types";
import { useQuery } from "react-query";

export function useGetObjects({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { data, isLoading, error } = useQuery<ObjectsInfo[], Error>(
    queryKeys.getObjects,
    ({ signal }) => getObjectsApi({ signal, page, limit })
  );

  return { objects: data, isLoading, error };
}
