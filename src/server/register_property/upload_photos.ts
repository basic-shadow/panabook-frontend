import { API } from "../api/axios.instance";
import { propertyEndpoints } from "../apiEndpoints";
import { type UploadPhotoResponse } from "./upload_photos.types";

export async function uploadPhotos(
  file: File,
  options?: { signal?: AbortSignal }
): Promise<UploadPhotoResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await API.post<UploadPhotoResponse>(
      propertyEndpoints.uploadPhotos,
      formData,
      {
        signal: options?.signal,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
}
