import { API } from "../api/axios.instance";
import { authEndpoints } from "../apiEndpoints";
import { type Signup, type SignupResponse } from "./signup.types";

export async function signup(
  signupData: Signup,
  options?: { signal?: AbortSignal }
): Promise<SignupResponse> {
  try {
    const { data } = await API.post<SignupResponse>(
      authEndpoints.signup,
      signupData,
      {
        signal: options?.signal,
      }
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}
