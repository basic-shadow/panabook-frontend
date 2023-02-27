import { API } from "../api/axios.instance";
import { authEndpoints } from "../apiEndpoints";
import { type UserInfo } from "./user_info.types";

export async function getUserInfo(options?: {
  signal?: AbortSignal;
}): Promise<UserInfo> {
  try {
    const { data } = await API.get<UserInfo>(authEndpoints.getUser, {
      signal: options?.signal,
    });

    return data;
  } catch (error: any) {
    throw error;
  }
}
