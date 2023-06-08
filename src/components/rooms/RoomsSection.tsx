import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React from "react";
import { AiFillTags } from "react-icons/ai";

export default function RoomsSection() {
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <div className="mb-4 flex items-center gap-2 px-4 pt-4">
            <AiFillTags size={24} />
            <h3 className="text-xl font-semibold">Номера</h3>
          </div>

          <div className="px-4 pb-4">
            {/* CARD */}
            <div className="w-fit rounded border">
              {/* IMAGE */}
              {/* <img src="" alt="qqqq" className="h-12 w-full object-cover" /> */}
              <div className="px-4 py-4">
                <h3 className="mb-1 text-sm">
                  Общий 7-местный номер для мужчин (ID 6784)
                </h3>
                <p className="text-sm">
                  Стандартная вместимость:
                  <span className="ml-1 font-bold text-gray-600">
                    Взрослых: 2
                  </span>
                  <span className="mx-1 font-bold text-gray-600">•</span>
                  <span className="font-bold text-gray-600">Детей: 3</span>
                </p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <button className="rounded bg-blue-700 px-4 py-2 text-sm text-white hover:bg-blue-500">
                    Загрузить фотографии
                  </button>
                  <button className="rounded border-blue-700 px-4 py-2 text-sm text-blue-700 hover:bg-blue-700 hover:text-white">
                    Редактировать
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
