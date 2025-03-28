import { routeEndpoints } from "@/shared/routeEndpoint";
import { useRouter } from "next/navigation";
import { useSignup } from "../api/useSignup";
import { type Signup } from "@/server/user/signup.types";
import { useGetUser } from "@/components/admin/api/usersQuery";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";
import { localStorageKeys } from "@/shared/localStorageKeys";

export const useSignupHook = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useSignup(onSuccess);
  const { refetch } = useGetUser();
  // NOTIFICATIONS
  const { notifySuccess } = useNotifications();

  function onSuccess() {
    refetch().then(() => {
      notifySuccess("Вы успешно выполнили регистрацию пользователя");
      router.push(routeEndpoints.registerProperty);
    });
  }

  const onSignup = async (user: Signup) => {
    try {
      await mutateAsync(user);
      localStorage.removeItem(localStorageKeys.selectedObjectId);
    } catch (error) {
      console.log("error =", error);
    }
  };

  return { onSignup, isLoading, error };
};
