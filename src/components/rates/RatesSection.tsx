import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { useGetAllRatesQuery } from "@/components/rates/api/useRatesQuery";
import React from "react";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { ROOM_NAMES } from "../registerProperty/components/register_multi_form/utils/const_data";
import { MEAL_PLANS } from "./utils/rates_data";
import { BsPencil, BsTrash } from "react-icons/bs";

export default function RatesSection({ id }: { id: number }) {
  const router = useRouter();
  const { data, isLoading } = useGetAllRatesQuery(id);

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <div className="flex items-center gap-4 border-b px-4 py-4">
            <h2 className="text-lg font-semibold">Тарифы</h2>
            <button
              className="rounded-md bg-blue-500 px-2 py-2 text-white"
              onClick={() => {
                router.push(routeEndpoints.createRate);
              }}
            >
              Добавить тариф
            </button>
          </div>
          {/* RATES LIST */}
          <div className="px-4 py-4">
            {!data && isLoading ? (
              <SpinnerLoader />
            ) : (
              <table className="w-full border">
                <thead className="w-full">
                  <tr className="bg-blue-100">
                    <th className="px-4 py-4 text-left">Название</th>
                    <th className="px-4 py-4 text-left">Номера</th>
                    <th className="px-4 py-4 text-left">Питание</th>
                  </tr>
                </thead>
                <tbody>
                  {data!.map((rate, i) => {
                    return (
                      <tr className="hover:bg-blue-50" key={rate.id}>
                        <td
                          className="flex flex-col px-4 py-6"
                          onClick={() => {
                            router.push(routeEndpoints.editRates + 1);
                          }}
                        >
                          <span className="mb-2 text-lg font-semibold text-blue-900">
                            {rate.name}
                          </span>
                          <span className="flex gap-2">
                            <button className="inline-flex items-center justify-center gap-2 rounded border border-gray-500 bg-white px-2 py-1 text-sm text-gray-500 hover:bg-gray-500 hover:text-white">
                              <BsPencil size={14} />
                              Редактировать
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 rounded border border-red-500 bg-white px-2 py-1 text-sm text-red-500 hover:bg-red-500 hover:text-white">
                              <BsTrash size={14} />
                              Удалить
                            </button>
                          </span>
                        </td>
                        <td className="px-4 py-6">
                          <ul className="list-disc">
                            {rate.rooms.map((room) => {
                              return (
                                <li
                                  key={"room " + i + room.id}
                                  className="text-sm"
                                >
                                  {ROOM_NAMES[room.roomName - 1]?.label || ""}
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                        <td className="px-4 py-6">
                          <ul className="list-disc">
                            {rate.mealPlans.map((mealplan) => {
                              return (
                                <li
                                  key={"mealplan " + i + mealplan}
                                  className="text-sm"
                                >
                                  {MEAL_PLANS.find(
                                    (mp) => mp.value === mealplan
                                  )?.label || ""}
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
