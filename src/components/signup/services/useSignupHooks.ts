import { routeEndpoints } from "@/shared/routeEndpoint";
import { useRouter } from "next/navigation";
import { useSignup } from "../api/useSignup";
import { type Signup } from "@/server/user/signup.types";
import { useQueryClient } from "react-query";
import { authEndpoints } from "@/server/apiEndpoints";

export const useSignupHook = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { mutateAsync, isLoading, error } = useSignup(onSuccess);

  function onSuccess() {
    queryClient.invalidateQueries(authEndpoints.getUser);

    router.push(routeEndpoints.registerProperty);
  }

  const onSignup = async (user: Signup) => {
    try {
      await mutateAsync(user);
    } catch (error) {}
  };

  return { onSignup, isLoading, error };
};
