import MainDashboard from "@/entities/mainDashboard/MainDashboard1";
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
              <BsFillBuildingFill size={24} />
              <h2 className="text-xl font-semibold">Фотографии объекта</h2>
            </div>
            <button className="flex items-center gap-2 rounded bg-blue-500 px-4 font-bold text-white hover:bg-blue-700">
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
