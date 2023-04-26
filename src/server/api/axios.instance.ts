import assert from "assert";
import Axios, { type AxiosRequestConfig } from "axios";

assert(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  "env variable not set: NEXT_PUBLIC_API_BASE_URL (did you forget to create a .env file from .env.template?)"
);

const apiInstance = Axios.create({
  baseURL: "/api",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const API = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    apiInstance.get<T>(url, {
      ...params,
      ...config,
    }),
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    apiInstance.post<T>(url, data, {
      ...config,
    }),
  patch: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    apiInstance.patch<T>(url, data, {
      ...config,
    }),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiInstance.delete<T>(url, {
      ...config,
    }),
};
