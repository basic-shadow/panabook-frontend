import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React from "react";
import { HiPhotograph } from "react-icons/hi";

export default function RoomPhotosSection() {
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <div className="mb-4 flex items-center gap-3 px-4 pt-4">
            <HiPhotograph
              className="xs:h-[32px] xs:w-[32px] lg:h-[42px] lg:w-[42px]"
              color="rgb(37,99,235)"
            />
            <h2 className="font-semibold xs:text-base lg:text-xl">
              Выберите номер для управления фотографиями
            </h2>
          </div>
          {/* ROOMS LIST */}
          <div className="px-4 py-4">
            <table className="w-full border">
              <thead className="w-full">
                <tr className="bg-blue-100">
                  <th className="px-4 py-2 text-left">Название</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="cursor-pointer px-4 py-2 text-left hover:bg-gray-100">
                    1
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
