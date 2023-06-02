import { queryKeys } from "@/server/queryKeys";
import { login } from "@/server/user/login";
import { type Login, type LoginResponse } from "@/server/user/login.types";
import { type TError } from "@/types/shared.types";
import { useMutation } from "react-query";

export function useLogin(onSuccess: (data: string) => void) {
  const { mutateAsync, isLoading, isSuccess, error } = useMutation<
    LoginResponse,
    TError,
    Login
  >(queryKeys.login, login, {
    onSuccess: (data) => onSuccess(data.accessToken),
  });

  return { mutateAsync: mutateAsync, isLoading, error, isSuccess };
}
