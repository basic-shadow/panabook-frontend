import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React from "react";
import { BsFillBuildingFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import Image from "next/image";

export default function PropertyPhotosPage({
  photosUrl,
}: {
  photosUrl: string[];
}) {
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          {/* ADD BUTTON */}
          <div className="flex gap-4 border-b px-4 py-4">
            <div className="my-2 flex items-center gap-2">
              <BsFillBuildingFill className="xs:h-[16px] xs:w-[16px] lg:h-[24px] lg:w-[24px]" />
              <h2 className="font-semibold xs:text-base lg:text-xl">
                Фотографии объекта
              </h2>
            </div>
            <button className="flex items-center gap-2 rounded bg-blue-500 font-bold text-white hover:bg-blue-600 xs:px-2 xs:text-xs lg:px-4 lg:text-base">
              Добавить
              <IoAddOutline />
            </button>
          </div>
          {/* PHOTOS LIST */}
          <div className="flex flex-wrap gap-4 px-4 py-4">
            {photosUrl.map((url, i) => (
              <div key={"image" + i} className={i === 0 ? "relative" : ""}>
                <Image
                  src={process.env.NEXT_PHOTO_BASE_URL + url}
                  alt={"image" + i}
                  className="object-cover"
                  width={250}
                  height={300}
                />
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-7 bg-sky-400 pt-1 text-center text-sm font-semibold text-white">
                    Главное фото
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
