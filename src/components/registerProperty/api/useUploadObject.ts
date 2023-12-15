import { queryKeys } from "@/server/queryKeys";
import { registerProperty } from "@/server/register_property/register_property_api";
import { uploadPhotos } from "@/server/register_property/upload_photos";
import { type UploadPhotoResponse } from "@/server/register_property/upload_photos.types";
import { useMutation } from "react-query";
import { type IRegisterProperty } from "../types/register_property_types";
import { type AxiosError } from "axios";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";

export function useUploadObject(onSuccess: (data: void) => void) {
  const { mutateAsync, isLoading, isSuccess, error } = useMutation<
    void,
    AxiosError,
    IRegisterProperty
  >(queryKeys.registerProperty, registerProperty, {
    onSuccess,
  });

  return { mutateAsync, isLoading, error, isSuccess };
}

export function useUploadPhoto(onSuccess: (data: UploadPhotoResponse) => void) {
  // NOTIFICATIONS
  const { notifyError } = useNotifications();

  const { mutateAsync, isLoading, isSuccess, error } = useMutation<
    UploadPhotoResponse,
    AxiosError,
    File
  >(queryKeys.uploadPhoto, uploadPhotos, {
    onSuccess,
    onError: (error: AxiosError) => {
      try {
        if (error.request.status === 413) {
          notifyError(
            "Фотография слишком большая. Максимальный размер фотографии 3 МБ"
          );
        }
      } catch (error) {}
    },
  });

  return { mutateAsync, isLoading, error, isSuccess };
}
