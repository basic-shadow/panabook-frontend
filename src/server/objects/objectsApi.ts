import { API } from "../api/axios.instance";
import { objectsEndpoints } from "../apiEndpoints";
import { type ObjectsInfo } from "./objects.types";

export async function getObjectsApi(options: {
  signal?: AbortSignal;
}): Promise<ObjectsInfo[]> {
  try {
    const { data } = await API.get<ObjectsInfo[]>(objectsEndpoints.getObjects, {
      signal: options?.signal,
    });

    return data;
  } catch (error: any) {
    throw error;
  }
}
