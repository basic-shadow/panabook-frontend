import React from "react";
import Head from "next/head";
import { useGetUser } from "@/components/home/api/useGetUser";

import "react-toastify/dist/ReactToastify.css";
import AuthLoadingLayer from "@/shared/AuthLoadingLayer/AuthLoadingLayer";
import RegisterHeader from "@/components/navbar/RegisterHeader";

export default function Container({
  title = "Panabook",
  description = "Panabook - Онлайн бронирование отелей, туров и авиабилетов",
  favicon = "/favicon.ico",
  removeHeader = false,
  loading = false,
  children,
}: {
  title?: string;
  description?: string;
  favicon?: string;
  removeHeader?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  const { user, isLoading } = useGetUser();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content={description} />
        <link rel="icon" href={favicon} />
      </Head>
      {user && !removeHeader ? <RegisterHeader /> : null}
      {/* @ts-ignore */}
      <AuthLoadingLayer user={user} isLoading={isLoading || loading}>
        {children}
      </AuthLoadingLayer>
    </>
  );
}
