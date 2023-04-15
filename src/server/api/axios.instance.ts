import { localStorageKeys } from "@/shared/localStorageKeys";
import assert from "assert";
import Axios, { type AxiosRequestConfig } from "axios";

assert(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  "env variable not set: NEXT_PUBLIC_API_BASE_URL (did you forget to create a .env file from .env.template?)"
);

const apiInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const urlFromError = originalRequest?.url || "";

      localStorage.removeItem(localStorageKeys.userToken);

      return apiInstance(originalRequest);
    }
    return Promise.reject(error.response);
  }
);

export const API = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    apiInstance.get<T>(url, {
      headers: {
        Authorization:
          "Bearer " +
          (JSON.parse(localStorage.getItem(localStorageKeys.userToken) ?? "{}")
            ?.accessToken ?? ""),
      },
      ...params,
      ...config,
    }),
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiInstance.post<T>(url, data, {
      headers: {
        Authorization:
          "Bearer " +
          (JSON.parse(localStorage.getItem(localStorageKeys.userToken) ?? "{}")
            ?.accessToken ?? ""),
      },
      ...config,
    }),
  patch: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    apiInstance.patch<T>(url, data, {
      headers: {
        Authorization:
          "Bearer " +
          (JSON.parse(localStorage.getItem(localStorageKeys.userToken) ?? "{}")
            ?.accessToken ?? ""),
      },
      ...config,
    }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiInstance.delete<T>(url, {
      headers: {
        Authorization:
          "Bearer " +
          (JSON.parse(localStorage.getItem(localStorageKeys.userToken) ?? "{}")
            ?.accessToken ?? ""),
      },
      ...config,
    }),
};
