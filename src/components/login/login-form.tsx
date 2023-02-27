"use client";

import { type Login } from "@/server/user/login.types";
import { useLocalStorageHook } from "@/shared/hooks/useLocalStorage";
import { localStorageKeys } from "@/shared/localStorageKeys";
import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLock } from "react-icons/ai";
import { GrLogin } from "react-icons/gr";
import { useLogin } from "./api/useLogin";

export default function LoginForm() {
  const router = useRouter();
  const [_, setToken] = useLocalStorageHook(localStorageKeys.userToken, {
    accessToken: "",
  });

  const onSuccessLogin = (data: string) => {
    setToken({ accessToken: data });
    router.push(routeEndpoints.registerProperty);
  };

  // FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const { mutateAsync, isLoading, error } = useLogin(onSuccessLogin);

  const onSubmit = async (data: Login) => {
    if (isLoading) return;
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log("error =", error);
    }
  };

  return (
    <div className="absolute z-10 flex min-h-full min-w-full items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-md bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <GrLogin className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Войти в аккаунт
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            или{" "}
            <Link
              href={routeEndpoints.signup}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Зарегистрировать свой объект
            </Link>
          </p>
        </div>

        {/* BACKEND ERROR */}
        {error && (
          <div className="flex items-center justify-center">
            <p className="text-xs italic text-red-500">
              Неверный e-mail или пароль.
            </p>
          </div>
        )}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <input
                id="email"
                autoComplete="email"
                placeholder="Email address"
                {...register("email", { required: true })}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />

              {errors.email && (
                <p className="text-xs italic text-red-500">
                  Пожалуйста, введите e-mail.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                autoComplete="current-password"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />

              {errors.password && (
                <p className="text-xs italic text-red-500">
                  Пожалуйста, введите пароль.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Запомнить меня?
              </label>
            </div>

            {/* <div className="text-sm">
              <Link
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Забыли пароль?
              </Link>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <AiOutlineLock
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? "Загрузка..." : "Вход"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
