import { queryKeys } from "@/server/queryKeys";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import { type TError } from "@/types/shared.types";
import { useQuery } from "react-query";
import {
  getUserObjectsApi,
  getUserSingleObjectApi,
} from "@/server/objects/userObjectsApi";
import { useState } from "react";
import { localStorageKeys } from "@/shared/localStorageKeys";

export function useGetUserObjects() {
  const { data, isLoading, refetch, isFetching, error } = useQuery<
    ObjectsInfo[],
    TError
  >(queryKeys.getObjects, ({ signal }) => getUserObjectsApi({ signal }));

  return { objects: data, isLoading, refetch, isFetching, error };
}

export function useGetUserSelectedObject() {
  // SELECTED OBJECT IN LOCAL STORAGE
  const [selectedObjectId, setSelectedObjectId] = useState(() => {
    if (typeof localStorage === "undefined") return null;
    const objectId = localStorage.getItem(localStorageKeys.selectedObjectId);
    if (objectId === null) {
      return null;
    }
    return +objectId;
  });

  const { data, isLoading, refetch, isFetching, error } = useQuery<
    ObjectsInfo,
    TError
  >(
    queryKeys.getSingleObject,
    ({ signal }) => getUserSingleObjectApi({ signal, id: selectedObjectId }),
    {
      onSuccess: (data) => {
        if (data) {
          setSelectedObjectId(data.id);
          localStorage.setItem(localStorageKeys.selectedObjectId, `${data.id}`);
        }
      },
    }
  );

  return { object: data, isLoading, refetch, isFetching, error };
}
