import { API } from "../api/axios.instance";
import { adminEndpoints } from "../apiEndpoints";
import { type ObjectsInfo } from "./objects.types";

export async function getAllObjectsApi(options: {
  signal?: AbortSignal;
  page: number;
  limit: number;
}): Promise<ObjectsInfo[]> {
  try {
    const { data } = await API.get<ObjectsInfo[]>(adminEndpoints.getObjects, {
      signal: options?.signal,
      params: {
        page: options.page,
        limit: options.limit,
      },
    });

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteObjectApi(objectId: number): Promise<void> {
  try {
    await API.delete<void>(
      adminEndpoints.deleteObject.replace(":id", objectId.toString())
    );
  } catch (error: any) {
    throw error;
  }
}
