import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React from "react";
import { BsFillBuildingFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

export default function PropertyPhotosPage() {
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
            <button className="flex items-center gap-2 rounded bg-blue-500 font-bold text-white hover:bg-blue-700 xs:px-2 xs:text-xs lg:px-4 lg:text-base">
              Добавить
              <IoAddOutline />
            </button>
          </div>
          {/* PHOTOS LIST */}
          <div></div>
        </div>
      </div>
    </MainDashboard>
  );
}
