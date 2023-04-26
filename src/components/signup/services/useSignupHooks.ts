import { routeEndpoints } from "@/shared/routeEndpoint";
import { useRouter } from "next/navigation";
import { useSignup } from "../api/useSignup";
import { type Signup } from "@/server/user/signup.types";
import { useGetUser } from "@/components/home/api/useGetUser";

export const useSignupHook = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useSignup(onSuccess);
  const { refetch } = useGetUser();

  function onSuccess() {
    refetch().then(() => {
      router.push(routeEndpoints.registerProperty);
    });
  }

  const onSignup = async (user: Signup) => {
    try {
      await mutateAsync(user);
    } catch (error) {
      console.log("error =", error);
    }
  };

  return { onSignup, isLoading, error };
};
