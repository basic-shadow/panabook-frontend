import { useUploadPhoto } from "@/components/registerProperty/api/useUploadObject";
import { useRegisterPropertyStore } from "@/components/registerProperty/store/store";
import { type UploadPhotoResponse } from "@/server/register_property/upload_photos.types";
import { AppButton } from "@/shared/UI";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import Image from "next/image";
import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import RegisterPropertyButtons from "../buttons_box";
import { useDragAndDrop } from "@/shared/hooks/dragAndDrop";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";

export default function PhotosForm({
  onGoBack,
  onNextStep,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
}) {
  const { notifyInfo } = useNotifications();
  const { propertyPhotos } = useRegisterPropertyStore();
  const [imageList, setImageList] =
    useState<UploadPhotoResponse[]>(propertyPhotos);

  const onSuccessUpload = (data: UploadPhotoResponse) => {
    setImageList((prev) => [...prev, data]);
  };
  // API
  const { mutateAsync, isLoading } = useUploadPhoto(onSuccessUpload);
  // DRAG AND DROP IMAGES
  const {
    onUploadImage,
    onDeleteImage,
    dragStart,
    dragEnter,
    drop,
    dropZoneVisible,
    handleDrop,
  } = useDragAndDrop(mutateAsync, imageList, setImageList);

  function onSubmit() {
    if (imageList.length > 0) {
      useRegisterPropertyStore.setState((_) => ({
        propertyPhotos: imageList,
      }));
      onNextStep();
    }
  }

  return (
    <div className="bg-white py-4 sm:py-6 lg:py-8">
      {/* IMAGE DROP ZONE */}
      <div
        className={
          "fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center text-4xl font-bold text-white " +
          (dropZoneVisible ? "bg-black bg-opacity-50" : "hidden bg-transparent")
        }
        onDrop={handleDrop}
      >
        {dropZoneVisible && "Перетащите файлы, чтобы отправить их"}
      </div>
      {/* PHOTOS FORM */}
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex items-center justify-center gap-2">
          <MdAddAPhoto size={36} />
          <h3 className="text-lg font-semibold">Галерея фотографий</h3>
        </div>
        {/* PHOTO INPUT */}

        <div className="mt-4 flex flex-col items-center justify-center border px-4 py-8">
          {imageList.length === 0 && (
            <h4 className="text-xl font-semibold">
              Загрузите по крайней мере 1 фотографию
            </h4>
          )}
          <input
            style={{ display: "none" }}
            id="photo-upload"
            onChange={(e) => {
              if (isLoading) {
                return notifyInfo("Ваше прошлое фото ещё загружается");
              }
              onUploadImage(e);
            }}
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
          <p className="mt-2 text-center text-sm text-gray-400">
            Вы можете щас переставлять фотографий как вам удобно.
          </p>
          <p className="text-center text-sm text-gray-400">
            Вы также сможете загрузить больше фотографий <br /> после
            регистрации
          </p>

          {/* PREVIEW IMAGES ARRAY */}
          <div className={`my-4 flex min-h-[100px] flex-wrap gap-2`}>
            {imageList.map((image, index) => (
              <div
                key={"image" + index}
                className="relative"
                onDragStart={(e) => dragStart(e, index)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={drop}
              >
                <Image
                  className="border-2 border-transparent object-cover hover:border-gray-600"
                  src={process.env.NEXT_PHOTO_BASE_URL + image.url}
                  alt={"object"}
                  width={320}
                  height={320}
                />
                <IoIosRemoveCircle
                  className="absolute right-4 top-4 z-50 cursor-pointer backdrop-blur-sm"
                  color="white"
                  size={32}
                  onClick={() => onDeleteImage(index)}
                />
              </div>
            ))}
            {isLoading && <SpinnerLoader color={"red"} />}
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-base">Перетащите фотографии сюда</p>
            <p className="text-gray-400">или</p>

            <AppButton
              text="Добавьте фотографии"
              className="px-6"
              htmlFor="photo-upload"
            />
          </div>

          {imageList.length > 0 && (
            <div className="mt-8 border border-green-600 p-2 text-center text-sm text-green-600">
              Отлично. Теперь вы можете перейти на следующий шаг. Чтобы
              увеличить свои шансы получения большего количества бронирования вы
              сможете добавить дополнительные фотографии позже.
            </div>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <RegisterPropertyButtons onGoBack={onGoBack} onNextStep={onSubmit} />
    </div>
  );
}
