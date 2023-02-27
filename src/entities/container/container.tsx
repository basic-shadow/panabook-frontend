import Header from "@/components/navbar/Header";
import React, { useEffect } from "react";
import Head from "next/head";
import { useLocalStorageHook } from "@/shared/hooks/useLocalStorage";
import { localStorageKeys } from "@/shared/localStorageKeys";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { useGetUser } from "@/components/home/api/useGetUser";

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

  const [userToken] = useLocalStorageHook<{ accessToken: string }>(
    localStorageKeys.userToken,
    {
      accessToken: "",
    }
  );
  const router = useRouter();

  useEffect(() => {
    if (userToken?.accessToken === "") {
      router.push(routeEndpoints.login);
    } else if (user?.numberOfObjects === 0) {
      router.push(routeEndpoints.registerProperty);
    }
  }, [userToken?.accessToken, user]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </Head>
      {userToken?.accessToken !== "" && <Header />}
      {children}
    </>
  );
}
