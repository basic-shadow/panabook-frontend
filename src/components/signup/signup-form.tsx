"use client";

import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { GrLogin } from "react-icons/gr";
import { useSignupHook } from "./services/useSignupHooks";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import { type Signup } from "@/server/user/signup.types";
import ErrorBox from "@/widgets/ErrorBox";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>();

  const { onSignup, isLoading, error } = useSignupHook();

  return (
    <div className="absolute z-10 flex min-h-full min-w-full items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-md bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <GrLogin className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Добавьте свой объект
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            или{" "}
            <Link
              href={routeEndpoints.login}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              войти в аккаунт
            </Link>
          </p>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSignup)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col gap-4 -space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="firstname" className="sr-only">
                Ваше имя
              </label>
              {errors.firstname && <p role="alert">First name is required</p>}
              <input
                {...register("firstname", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                id="firstname"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <input
                {...register("email", { required: true })}
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                {...register("password", { required: true })}
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Пароль"
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && <ErrorBox data={error.data} />}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? <SpinnerLoader /> : "Начать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
