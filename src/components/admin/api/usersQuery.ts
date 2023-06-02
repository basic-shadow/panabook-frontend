import { queryKeys } from "@/server/queryKeys";
import { getUserInfo } from "@/server/user/user_info";
import { type UserInfo } from "@/server/user/user_info.types";
import { useQuery } from "react-query";

export function useGetUser() {
  const { data, isLoading, refetch, error } = useQuery<UserInfo, Error>(
    queryKeys.getUser,
    getUserInfo
  );

  return { user: data, isLoading, refetch, error };
}
