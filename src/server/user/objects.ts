import { API } from "../api/axios.instance";
import { authEndpoints } from "../apiEndpoints";
import { type ObjectsInfo } from "./objects.types";

export async function getObjectsApi(options: {
  signal?: AbortSignal;
  page: number;
  limit: number;
}): Promise<ObjectsInfo[]> {
  try {
    const { data } = await API.get<ObjectsInfo[]>(authEndpoints.getObjects, {
      signal: options?.signal,
      params: {
        page: options.page,
        limit: options.limit,
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
