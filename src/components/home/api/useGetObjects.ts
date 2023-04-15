import { queryKeys } from "@/server/queryKeys";
import { getObjectsApi } from "@/server/user/objects";
import { type ObjectsInfo } from "@/server/user/objects.types";
import { type TError } from "@/server/user/shared.types";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

export function useGetObjects({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const mounted = useRef<boolean>(false);
  const { data, isLoading, refetch, isFetching, error } = useQuery<
    ObjectsInfo[],
    TError
  >(
    queryKeys.getObjects,
    ({ signal }) => getObjectsApi({ signal, page, limit }),
    { enabled: mounted.current }
  );

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      refetch();
    }
  }, []);

  return { objects: data, isLoading, isFetching, error };
}
