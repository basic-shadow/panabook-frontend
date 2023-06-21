import React from "react";
import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { BsFillBuildingFill } from "react-icons/bs";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { type ObjectsInfo } from "@/server/objects/objects.types";
import { localStorageKeys } from "@/shared/localStorageKeys";

const mapStatusToText = (status: string) => {
  switch (status) {
    case "accepted":
      return "Активный";
    case "rejected":
      return "Неактивный";
    case "pending":
    default:
      return "На модерации";
  }
};

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
          <div className="flex gap-4 border-b px-4 xs:py-2 lg:py-4">
            <div className="flex items-center gap-2 xs:my-1 lg:my-2">
              <BsFillBuildingFill className="xs:h-[16px] xs:w-[16px] lg:h-[24px] lg:w-[24px]" />
              <h2 className="font-semibold xs:text-base lg:text-xl">
                Объекты размещения
              </h2>
            </div>
            {/* ADD BUTTON */}
            <button
              className="flex items-center gap-2 rounded bg-blue-500 font-bold text-white hover:bg-blue-700 xs:px-2 xs:text-xs lg:px-4 lg:text-base"
              onClick={() => router.push(routeEndpoints.registerProperty)}
            >
              Добавить
              <IoAddOutline />
            </button>
          </div>
          {/* TABLE */}
          <div className="overflow-x-auto px-4 pb-16 pt-8">
            <table className="w-full border">
              <thead className="w-full">
                <tr className="bg-blue-100">
                  <th className="px-4 py-4 text-left text-sm">ID</th>
                  <th className="px-4 py-4 text-left text-sm">Название</th>
                  <th className="px-4 py-4 text-left text-sm">Адрес</th>
                  <th className="px-4 py-4 text-left text-sm">Статус</th>
                  <th className="px-4 py-4 text-left text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {objects.map((object) => (
                  <tr
                    className={"cursor-pointer hover:bg-blue-50"}
                    key={object.id}
                  >
                    <td className="px-4 py-4 text-left text-sm">{object.id}</td>
                    <td className="px-4 py-4 text-left text-sm">
                      {object.name}
                    </td>
                    <td className="px-4 py-4 text-left text-sm">
                      {object.address}
                    </td>
                    <td className="px-4 py-4 text-left text-sm">
                      <span className="rounded border-sky-500 px-2 py-1 font-semibold text-sky-500">
                        {mapStatusToText(object.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-left text-sm">
                      {objectId !== null &&
                      objectId === object.id.toString() ? (
                        <span className="whitespace-nowrap rounded bg-blue-500 px-2 py-1 text-xs font-bold text-white">
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
