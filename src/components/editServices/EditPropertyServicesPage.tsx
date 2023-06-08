import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { type IGeneralInfo } from "../registerProperty/types/register_property_types";
import { PROPERTY_SERVICES } from "../registerProperty/components/register_multi_form/utils/const_data";
import { FACILITIES_CATEGORIES } from "../registerProperty/components/register_multi_form/utils/const_data";
import React from "react";

export default function EditPropertyServicesPage({
  initState,
}: {
  initState?: number[];
}) {
  async function onSubmit() {
    console.log("submit");
  }

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <div className="border-b px-4 py-4 ">
            <h3 className="text-xl font-semibold">Удобства и услуги</h3>
            <p className="mt-2 text-sm text-gray-600">
              Увеличьте вероятность получения бронирования, представив гостям
              информацию о преимуществах и сервисах, которые предлагает ваш
              объект. Обновите данные о доступных услугах на вашей территории.
            </p>
          </div>
          {/* SELECT BOX */}
          <h3 className="p-4 text-xl font-semibold">Популярные услуги</h3>
          <div className="flex flex-wrap border-b">
            {PROPERTY_SERVICES.map((service) => {
              return (
                <div className="w-1/2 px-4 py-4" key={service.value}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="services"
                      value={service.value}
                    />
                    <span className="ml-2">{service.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
          {FACILITIES_CATEGORIES.map((category) => {
            return (
              <React.Fragment key={category.label}>
                <h3 className="p-4 text-xl font-semibold">{category.label}</h3>
                <div className="flex flex-wrap border-b">
                  {category.value.map((service) => {
                    return (
                      <div className="w-1/2 px-4 py-4" key={service.value}>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            name="services"
                            value={service.value}
                          />
                          <span className="ml-2">{service.label}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        {/* SUBMIT */}
        <div className="my-8">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
            onClick={onSubmit}
          >
            Сохранить
          </button>
        </div>
      </div>
    </MainDashboard>
  );
}
