import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import {
  PROPERTY_SERVICES,
  PROPERTY_SERVICES_ADDITIONAL,
} from "../registerProperty/components/register_multi_form/utils/const_data";
import React, { useState } from "react";
import { useMutateProperty } from "../editDescription/service/useMutateProperty";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";

export default function EditPropertyServicesSection({
  id,
  initState,
}: {
  id: number;
  initState: number[];
}) {
  // NOTIFICATIONS
  const { notifySuccess, notifyInfo } = useNotifications();
  // API
  const { mutateAsync, isLoading } = useMutateProperty();
  // STATE
  const [services, setServices] = useState(initState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setServices((prev) => [...prev, +value]);
    } else {
      setServices((prev) => prev.filter((item) => item !== +value));
    }
  };

  async function onSubmit() {
    if (!isLoading) {
      await mutateAsync({
        id,
        services,
      });
      notifySuccess("Услуги успешно изменены");
    } else {
      notifyInfo("Подождите, идет загрузка");
    }
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
                      onChange={onChange}
                      value={service.value}
                      checked={services.includes(service.value)}
                    />
                    <span className="ml-2">{service.label}</span>
                  </label>
                </div>
              );
            })}
          </div>
          {PROPERTY_SERVICES_ADDITIONAL.map((category) => {
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
                            value={service.value}
                            onChange={onChange}
                            checked={services.includes(service.value)}
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
