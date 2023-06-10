import React, { useMemo } from "react";
import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { BsFillBuildingFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import { localStorageKeys } from "@/shared/localStorageKeys";

export default function UserPropertiesSection({
  objects,
}: {
  objects: ObjectsInfo[];
}) {
  // ROUTER
  const router = useRouter();
  // SELECTED OBJECT
  const objectId =
    typeof localStorage !== "undefined"
      ? localStorage.getItem(localStorageKeys.selectedObjectId)
      : null;

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
          <div className="px-4 pb-16 pt-8">
            <table className="w-full border">
              <thead className="w-full">
                <tr className="bg-blue-100">
                  <th className="px-4 py-4 text-left text-sm">ID</th>
                  <th className="py-4 text-left text-sm">Название</th>
                  <th className="py-4 text-left text-sm">Адрес</th>
                  <th className="py-4 text-left text-sm">Статус</th>
                  <th className="py-4 text-left text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {objects.map((object) => (
                  <tr
                    className={"cursor-pointer hover:bg-blue-50"}
                    key={object.id}
                  >
                    <td className="px-4 py-4 text-left text-sm">{object.id}</td>
                    <td className="py-4 text-left text-sm">{object.name}</td>
                    <td className="py-4 text-left text-sm">{object.address}</td>
                    <td className="py-4 text-left text-sm">{"status"}</td>
                    <td className="py-4 text-left text-sm">
                      {objectId !== null &&
                      objectId === object.id.toString() ? (
                        <span className="rounded bg-blue-500 px-2 py-1 text-xs font-bold text-white">
                          Текущий объект
                        </span>
                      ) : (
                        <button className="rounded border-blue-500 px-2 py-1 text-xs font-bold text-blue-500 hover:bg-blue-500 hover:text-white">
                          Переключиться
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
