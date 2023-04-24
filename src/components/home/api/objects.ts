import { queryKeys } from "@/server/queryKeys";
import { deleteObjectApi, getObjectsApi } from "@/server/user/objectsApi";
import { type ObjectsInfo } from "@/server/user/objects.types";
import { type TError } from "@/server/user/shared.types";
import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
