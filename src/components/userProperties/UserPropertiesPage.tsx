import MainDashboard from "@/entities/mainDashboard/mainDashboard";
import React from "react";
import { BsFillBuildingFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";

export default function UserPropertiesPage() {
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          {/* ADD BUTTON */}
          <div className="flex gap-4 border-b px-4 py-4">
            <div className="my-2 flex items-center gap-2">
              <BsFillBuildingFill size={24} />
              <h2 className="text-xl font-semibold">Объекты размещения</h2>
            </div>
            <button className="flex items-center gap-2 rounded bg-blue-500 px-4 font-bold text-white hover:bg-blue-700">
              Добавить
              <IoAddOutline />
            </button>
          </div>
          {/* TABLE */}
          <div className="px-4 py-4">
            <table className="w-full">
              <thead>
                <tr className="border pl-4">
                  <th className="py-2 text-left">ID</th>
                  <th className="py-2 text-left">Название</th>
                  <th className="py-2 text-left">Адрес</th>
                  <th className="py-2 text-left">Статус</th>
                  <th className="py-2 text-left"> </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-200">
                  <td className="py-2 text-left">ID</td>
                  <td className="py-2 text-left">Название</td>
                  <td className="py-2 text-left">Страна</td>
                  <td className="py-2 text-left">Город</td>
                  <td className="py-2 text-left">Адрес</td>
                </tr>
                <tr>
                  <td className="py-2 text-left">Название</td>
                  <td className="py-2 text-left">Название</td>
                  <td className="py-2 text-left">Страна</td>
                  <td className="py-2 text-left">Город</td>
                  <td className="py-2 text-left">Адрес</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
