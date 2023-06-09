import { type EditUserProfileInfo } from "@/components/editUserProfile/types/editUserProfile.types";
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

export async function updateUserApi(
  data: EditUserProfileInfo,
  options?: { signal?: AbortSignal }
): Promise<void> {
  try {
    const normalizedData = {
      firstname: data.firstName,
      surname: data.lastName,
      phoneNumber: data.contactPhone,
      password: data.newPassword,
      passwordConfirmation: data.confirmNewPassword,
    };

    await API.put<any>(authEndpoints.updateUser, normalizedData, {
      signal: options?.signal,
    });
  } catch (error: any) {
    throw error;
  }
}

export async function logoutUserApi(
  data: void,
  options?: {
    signal?: AbortSignal;
  }
): Promise<void> {
  try {
    await API.post<any>(authEndpoints.logout, {
      signal: options?.signal,
    });
  } catch (error: any) {
    throw error;
  }
}
