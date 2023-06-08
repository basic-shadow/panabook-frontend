import React from "react";
import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { BsFillBuildingFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";

export default function UserPropertiesSection() {
  // ROUTER
  const router = useRouter();

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
            <button
              className="flex items-center gap-2 rounded bg-blue-500 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => router.push(routeEndpoints.registerProperty)}
            >
              Добавить
              <IoAddOutline />
            </button>
          </div>
          {/* TABLE */}
          <div className="px-4 py-4">
            <table className="w-full border">
              <thead className="w-full">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="py-2 text-left">Название</th>
                  <th className="py-2 text-left">Адрес</th>
                  <th className="py-2 text-left">Статус</th>
                  <th className="py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 text-left">1</td>
                  <td className="py-2 text-left">2</td>
                  <td className="py-2 text-left">3</td>
                  <td className="py-2 text-left">4</td>
                  <td className="py-2 text-left">5</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-left">1</td>
                  <td className="py-2 text-left">2</td>
                  <td className="py-2 text-left">3</td>
                  <td className="py-2 text-left">4</td>
                  <td className="py-2 text-left">5</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="px-4 py-2 text-left">1</td>
                  <td className="py-2 text-left">2</td>
                  <td className="py-2 text-left">3</td>
                  <td className="py-2 text-left">4</td>
                  <td className="py-2 text-left">5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
