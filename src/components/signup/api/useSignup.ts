import { queryKeys } from "@/server/queryKeys";
import { signup } from "@/server/user/signup";
import { type Signup, type SignupResponse } from "@/server/user/signup.types";
import { useMutation } from "react-query";

export function useSignup(onSuccess: (data: SignupResponse) => void) {
  const { mutateAsync, isLoading, isSuccess, error } = useMutation<
    SignupResponse,
    Error,
    Signup
  >(queryKeys.signup, signup, {
    onSuccess,
  });

  return { mutateAsync: mutateAsync, isLoading, error, isSuccess };
}
