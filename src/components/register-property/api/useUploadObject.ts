import { queryKeys } from "@/server/queryKeys";
import { registerProperty } from "@/server/register_property/register_property_api";
import { uploadPhotos } from "@/server/register_property/upload_photos";
import { type UploadPhotoResponse } from "@/server/register_property/upload_photos.types";
import { useMutation } from "react-query";
import { type IRegisterProperty } from "../types/register_property_types";

export function useUploadObject(onSuccess: (data: void) => void) {
  const { mutateAsync, isLoading, isSuccess, error } = useMutation<
    void,
    Error,
    IRegisterProperty
  >(queryKeys.registerProperty, registerProperty, {
    onSuccess,
  });

  return { mutateAsync: mutateAsync, isLoading, error, isSuccess };
}

export function useUploadPhoto(onSuccess: (data: UploadPhotoResponse) => void) {
  const { mutateAsync, isLoading, isSuccess, error } = useMutation<
    UploadPhotoResponse,
    Error,
    File
  >(queryKeys.uploadPhoto, uploadPhotos, {
    onSuccess,
  });

  return { mutateAsync: mutateAsync, isLoading, error, isSuccess };
}
