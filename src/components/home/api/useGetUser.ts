import { queryKeys } from "@/server/queryKeys";
import { getUserInfo } from "@/server/user/user_info";
import { type UserInfo } from "@/server/user/user_info.types";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

export function useGetUser() {
  const mounted = useRef<boolean>(false);
  const { data, isLoading, refetch, error } = useQuery<UserInfo, Error>(
    queryKeys.getUser,
    getUserInfo,
    { enabled: mounted.current }
  );

  useEffect(() => {
    if (!mounted.current) {
      refetch();
      mounted.current = true;
    }
  }, []);

  return { user: data, isLoading, error };
}
