import { pathToUrl } from "@/shared/utils/pathComplete";
import { API } from "../api/axios.instance";
import { objectsEndpoints } from "../apiEndpoints";
import { type ObjectsInfo } from "./objects.types";

export async function getUserObjectsApi(options: {
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

export async function getUserSingleObjectApi(options: {
  signal?: AbortSignal;
  id?: number | null;
}): Promise<ObjectsInfo> {
  try {
    const { data } = await API.get<ObjectsInfo>(
      pathToUrl(
        objectsEndpoints.getSingleObject,
        options.id ? { id: options.id } : null,
        objectsEndpoints.getFirstObject
      ),
      {
        signal: options?.signal,
      }
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}
