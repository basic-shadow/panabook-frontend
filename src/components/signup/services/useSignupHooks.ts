"use client";

import { routeEndpoints } from "@/shared/routeEndpoint";
import { useRouter } from "next/navigation";
import { useSignup } from "../api/useSignup";
import { type Signup } from "@/server/user/signup.types";

export const useSignupHook = () => {
  const router = useRouter();
  const { mutateAsync, isLoading } = useSignup(onSuccess);

  function onSuccess() {
    router.push(routeEndpoints.registerProperty);
  }

  const onSignup = async (user: Signup) => {
    try {
      await mutateAsync(user);
    } catch (error) {}
  };

  return { onSignup, isLoading };
};
