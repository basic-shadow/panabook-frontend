import { API } from "../api/axios.instance";
import { authEndpoints } from "../apiEndpoints";
import type { Login, LoginResponse } from "./login.types";

export async function login(
  loginData: Login,
  options?: { signal?: AbortSignal }
): Promise<LoginResponse> {
  try {
    const { data } = await API.post<LoginResponse>(
      authEndpoints.login,
      loginData,
      {
        signal: options?.signal,
      }
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}
