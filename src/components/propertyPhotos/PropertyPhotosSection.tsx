import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React, { useEffect, useState } from "react";
import { BsFillBuildingFill, BsFillTrashFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import Image from "next/image";
import { useDragAndDrop } from "@/shared/hooks/dragAndDrop";
import { useUploadPhoto } from "../registerProperty/api/useUploadObject";
import { type UploadPhotoResponse } from "@/server/register_property/upload_photos.types";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";
import { useMutateProperty } from "../editDescription/service/useMutateProperty";

export default function PropertyPhotosPage({
  photos,
  propertyId,
}: {
  photos: UploadPhotoResponse[];
  propertyId: number;
}) {
  const [modified, setModified] = useState(false);
  const { notifyInfo, notifySuccess } = useNotifications();

  const onSuccessUpload = (data: UploadPhotoResponse) => {
    setImageList((prev) => [...prev, data]);
    setModified(true);
  };
  const [imageList, setImageList] = useState<UploadPhotoResponse[]>(photos);
  // API
  const { mutateAsync, isLoading } = useUploadPhoto(onSuccessUpload);
  const { mutateAsync: updateProperty, isLoading: updateLoading } =
    useMutateProperty();
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
  // ON SAVE
  async function onSave() {
    if (modified && !updateLoading) {
      await updateProperty({
        imageIds: imageList.map((images) => images.id),
        id: propertyId,
      });
      setModified(false);
      notifySuccess("Изменения сохранены");
    } else {
      notifyInfo("Загрузка данных...");
    }
  }

  return (
    <MainDashboard>
      <div
        className={
          "fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center text-4xl font-bold text-white " +
          (dropZoneVisible ? "bg-black bg-opacity-50" : "hidden bg-transparent")
        }
        onDrop={handleDrop}
      >
        {dropZoneVisible && "Перетащите файлы, чтобы отправить их"}
      </div>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          {/* ADD BUTTON */}
          <div className="flex gap-4 border-b px-4 py-4">
            <div className="my-2 flex items-center gap-4">
              <BsFillBuildingFill className="xs:h-[16px] xs:w-[16px] lg:h-[24px] lg:w-[24px]" />
              <div>
                <h2 className="font-semibold xs:text-base lg:text-xl">
                  Фотографии объекта
                </h2>
                <p className="text-sm italic text-gray-500">
                  Вы можете перемещать фотографии сюда
                </p>
              </div>
            </div>
            <label
              className="flex cursor-pointer items-center gap-2 rounded bg-blue-500 font-bold text-white hover:bg-blue-600 xs:px-2 xs:text-xs lg:px-4 lg:text-base"
              htmlFor="photo-upload"
            >
              Добавить
              <IoAddOutline />
            </label>
            <input
              style={{ display: "none" }}
              onChange={(e) => {
                if (isLoading) {
                  return notifyInfo("Ваше прошлое фото ещё загружается");
                }
                onUploadImage(e);
              }}
              id="photo-upload"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/webp"
            />
          </div>
          {/* PHOTOS LIST */}
          <p className="mt-2 px-4 py-2 text-sm text-gray-700">
            Вы можете переставлять фотографии в удобном вам порядке.
          </p>
          <div className="flex flex-wrap gap-4 border-b px-4 py-4 ">
            {imageList.map((photo, i) => (
              <div
                key={"image" + i}
                className={i === 0 ? "relative" : ""}
                onDragStart={(e) => dragStart(e, i)}
                onDragEnter={(e) => dragEnter(e, i)}
                onDragEnd={(e) => {
                  drop(e);
                  setModified(true);
                }}
              >
                <Image
                  src={process.env.NEXT_PHOTO_BASE_URL + photo.url}
                  alt={"image" + i}
                  className="object-cover"
                  width={250}
                  height={300}
                />
                {i !== 0 && (
                  <div className="absolute right-4 top-4 z-50 cursor-pointer rounded bg-white p-2">
                    <BsFillTrashFill
                      className="backdrop-blur-sm"
                      color="black"
                      size={16}
                      onClick={() => {
                        onDeleteImage(i);
                        setModified(true);
                      }}
                    />
                  </div>
                )}
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-7 bg-sky-400 pt-1 text-center text-sm font-semibold text-white">
                    Главное фото
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className={`mx-4 mb-4 mt-4 ${
              modified ? "bg-blue-500" : "bg-gray-200"
            } px-4 py-2 font-bold text-white ${
              modified ? "hover:bg-blue-600" : ""
            }`}
            disabled={!modified}
            onClick={onSave}
          >
            Сохранить
          </button>
        </div>
      </div>
    </MainDashboard>
  );
}
