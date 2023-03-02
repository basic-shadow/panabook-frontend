import Header from "@/components/navbar/Header";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useLocalStorageHook } from "@/shared/hooks/useLocalStorage";
import { localStorageKeys } from "@/shared/localStorageKeys";
import { useRouter } from "next/navigation";
import { useRouter as useLocation } from "next/router";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { useGetUser } from "@/components/home/api/useGetUser";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";

function LoadingUI({ children }: { children?: React.ReactNode }) {
  const { user, isLoading } = useGetUser();
  const [routerLoading, setRouterLoading] = useState(false);
  const [userToken] = useLocalStorageHook<{ accessToken: string }>(
    localStorageKeys.userToken,
    {
      accessToken: "",
    }
  );
  // ROUTER
  const router = useRouter();
  const location = useLocation();

  useEffect(() => {
    if (
      userToken?.accessToken === "" &&
      location.asPath !== routeEndpoints.signup
    ) {
      router.push(routeEndpoints.login);
    } else if (user?.numberOfObjects === 0) {
      router.push(routeEndpoints.registerProperty);
    } else if (
      user !== undefined &&
      (location.asPath === routeEndpoints.login ||
        location.asPath === routeEndpoints.signup)
    ) {
      router.push(routeEndpoints.home);
    }
  }, [userToken?.accessToken, user, location.asPath]);

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

export default function Container({
  title = "Panabook",
  description = "Panabook - Онлайн бронирование отелей, туров и авиабилетов",
  favicon = "/favicon.ico",
  children,
}: {
  title?: string;
  description?: string;
  favicon?: string;
  children?: React.ReactNode;
}) {
  const { user } = useGetUser();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </Head>
      {user ? <Header /> : null}
      {/* @ts-ignore */}
      <LoadingUI>{children}</LoadingUI>
    </>
  );
}
