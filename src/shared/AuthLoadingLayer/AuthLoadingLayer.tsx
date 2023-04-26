import { type UserInfo } from "@/server/user/user_info.types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SpinnerLoader from "../UI/SpinnerLoader/SpinnerLoader";
import { useRouter as useLocation } from "next/router";
import { routeEndpoints } from "../routeEndpoint";

const adminUsers = ["islambek.mamet.00@gmail.com", "dake013013@gmail.com"];

export default function AuthLoadingLayer({
  children,
  user,
  isLoading,
}: {
  children?: React.ReactNode;
  user: UserInfo | undefined;
  isLoading: boolean;
}) {
  const [routerLoading, setRouterLoading] = useState(false);
  // ROUTER
  const router = useRouter();
  const location = useLocation();

  useEffect(() => {
    if (user === undefined && location.asPath !== routeEndpoints.signup) {
      router.push(routeEndpoints.login);
    } else if (user?.numberofobjects == 0) {
      if (adminUsers.some((email) => email === user.email)) return;
      router.push(routeEndpoints.registerProperty);
    } else if (
      user !== undefined &&
      (location.asPath === routeEndpoints.login ||
        location.asPath === routeEndpoints.signup)
    ) {
      router.push(routeEndpoints.success);
    }
  }, [user, location.asPath]);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== location.asPath && setRouterLoading(true);
    const handleComplete = (url: string) => {
      url === location.asPath &&
        setTimeout(() => {
          setRouterLoading(false);
        }, 1000);
    };

    location.events.on("routeChangeStart", handleStart);
    location.events.on("routeChangeComplete", handleComplete);
    location.events.on("routeChangeError", handleComplete);

    return () => {
      location.events.off("routeChangeStart", handleStart);
      location.events.off("routeChangeComplete", handleComplete);
      location.events.off("routeChangeError", handleComplete);
    };
  });

  const isLoadingState = isLoading || routerLoading;

  return isLoadingState ? (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-gray-200">
      <SpinnerLoader color={"text-indigo-500"} />
    </div>
  ) : (
    children
  );
}
