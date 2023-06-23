import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  rateSchema,
  type EditRateInfo,
  toRateDto,
} from "./types/editRate.types";
import NewInput from "@/shared/UI/NewInput/NewInput";
import FormLabel from "@/shared/UI/NewInput/FormLabel";
import { MEAL_PLANS } from "./utils/rates_data";
import { ROOM_NAMES } from "../registerProperty/components/register_multi_form/utils/const_data";
import { useCreateRate } from "./api/useRatesQuery";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";

export default function EditRateSection({
  objectId,
  rateId,
  name,
  selectedMealPlans,
  roomPlans,
  selectedRoomPlans,
}: {
  objectId: number;
  rateId?: number;
  name?: string;
  selectedMealPlans?: (typeof MEAL_PLANS)[number]["value"][];
  roomPlans: { id: number; name: number }[];
  selectedRoomPlans?: number[];
}) {
  // ROUTER
  const router = useRouter();
  // NOTIFICATIONS
  const { notifyInfo } = useNotifications();
  // API
  const { mutateAsync: createRate, isLoading: createRateLoading } =
    useCreateRate();
  // STATE
  const [_, setUpdateUI] = useState(false);
  const [rateMealPlans, setRateMealPlans] = useState<
    (typeof MEAL_PLANS)[number]["value"][]
  >(selectedMealPlans || []);
  const formMethods = useForm<EditRateInfo>({
    defaultValues: {
      name: name || "",
      roomTypes: selectedRoomPlans || [],
    },
    resolver: yupResolver(rateSchema),
  });

  async function onSubmit(data: EditRateInfo) {
    if (!name && !selectedMealPlans && !createRateLoading) {
      const rateDto = toRateDto(
        {
          name: data.name,
          roomTypes: data.roomTypes,
        },
        rateMealPlans,
        objectId
      );

      await createRate(rateDto);
      router.push(routeEndpoints.rates);
    } else if (name && selectedMealPlans) {
      notifyInfo("Тариф успешно обновлен");
    } else {
      notifyInfo("Подождите, идёт загрузка...");
    }
    console.log(data);
  }

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <h2 className="border-b px-4 py-4 text-lg font-semibold">
            Добавить тариф
          </h2>
          {/* RATES LIST */}
          <div className="px-4 py-4">
            <FormProvider {...formMethods}>
              <NewInput
                id={"name"}
                name={"name"}
                label="Название тарифа"
                required
              />
              <FormLabel id="roomTypes" label="Укажите типы номеров">
                {roomPlans.map((room) => (
                  <div key={room.id} className="mt-2 flex items-center gap-2">
                    <input
                      id={"room" + room.id}
                      type="checkbox"
                      className="form-checkbox"
                      name="roomTypes"
                      value={room.id}
                      checked={selectedRoomPlans?.includes(room.id)}
                      onChange={(e) => {
                        formMethods.setValue(
                          "roomTypes",
                          e.target.checked
                            ? [...formMethods.watch().roomTypes, room.id]
                            : formMethods
                                .watch()
                                .roomTypes.filter((l) => l !== room.id)
                        );
                      }}
                    />
                    <label className="ml-2" htmlFor={"room" + room.id}>
                      {ROOM_NAMES[room.name - 1]?.label}
                    </label>
                  </div>
                ))}
                {formMethods.formState.errors.roomTypes && (
                  <p className="text-sm text-red-500">
                    {formMethods.formState.errors.roomTypes.message}
                  </p>
                )}
              </FormLabel>
              <FormLabel id="mealPlans" label="Выберите план питания">
                {MEAL_PLANS.map((mealPlan) => (
                  <div
                    key={mealPlan.value}
                    className="mt-2 flex items-center gap-2"
                  >
                    <input
                      id={"mealPlan" + mealPlan.value}
                      type="checkbox"
                      className="form-checkbox"
                      name="mealPlans"
                      value={mealPlan.value}
                      checked={rateMealPlans.includes(mealPlan.value)}
                      onChange={(e) => {
                        setRateMealPlans((prev) =>
                          e.target.checked
                            ? [...prev, mealPlan.value]
                            : prev.filter((l) => l !== mealPlan.value)
                        );
                      }}
                    />
                    <label
                      className="ml-2"
                      htmlFor={"mealPlan" + mealPlan.value}
                    >
                      {mealPlan.label}
                    </label>
                  </div>
                ))}
              </FormLabel>
            </FormProvider>
          </div>
          {/* BUTTONS */}
          <div className="flex items-center gap-2 px-4 py-4">
            <button className="rounded-md bg-gray-500 px-2 py-2 text-white">
              Отменить
            </button>
            <button
              className="rounded-md bg-blue-500 px-2 py-2 text-white"
              onClick={formMethods.handleSubmit(onSubmit, (err) => {
                console.log("err =", err);
                setUpdateUI((prev) => !prev);
              })}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
