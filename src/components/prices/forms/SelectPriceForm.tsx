import { ROOM_TYPES } from "@/components/registerProperty/components/register_multi_form/utils/const_data";
import { type PropertyRoom, type Rates } from "@/server/objects/objects.types";
import React, { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import NewInput from "@/shared/UI/NewInput/NewInput";

// WEEKDAYS
export const WEEKDAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function SelectPriceForm({
  step,
  setStep,
  maxGuests,
  rates,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  maxGuests: number;
  rates: Rates[];
}) {
  const [openDate, setOpenDate] = useState({ dateFrom: false, dateTo: false });
  const { watch, setValue } = useFormContext();

  const toggleStep = (index: number) => () =>
    setStep((prev) => (prev === index ? -1 : index));

  const onOpenDate =
    (date: "dateFrom" | "dateTo") =>
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setOpenDate((prev) => ({ ...prev, [date]: true }));
    };

  const closeDates = useCallback(
    () => setOpenDate({ dateFrom: false, dateTo: false }),
    []
  );

  const filledForm =
    watch("price") !== undefined &&
    `${watch("price")}`.length > 0 &&
    watch("dateTo") !== undefined &&
    watch("dateFrom") !== undefined &&
    (watch("activeRange") as []).length > 0;

  useEffect(() => {
    if (!openDate.dateFrom && !openDate.dateTo) return;

    window.addEventListener("click", closeDates);

    return () => {
      window.removeEventListener("click", closeDates);
    };
  }, [openDate, closeDates]);

  return (
    <div className="mt-4 bg-white shadow">
      <div className="flex w-full items-center justify-between px-4 py-4">
        <p
          className={
            "text-lg font-semibold " +
            (filledForm ? "text-green-600" : "text-black")
          }
        >
          3. Укажите базовую цену
        </p>
        <button className="text-sm text-sky-600" onClick={toggleStep(2)}>
          {step === 2 ? "Изменить" : "Свернуть"}
        </button>
      </div>
      <div
        className={`${
          step === 2 ? "h-full" : "pointer-events-none h-0 overflow-hidden"
        }`}
      >
        {/* INFO */}
        <p className="bg-amber-200 px-4 py-4 text-sm leading-6">
          <span className="font-semibold">Базовая цена</span> это стоимость
          номера за ночь при стандартном размещении.
          <br /> Сейчас вы выбрали:{" "}
          <span className="font-bold">
            {ROOM_TYPES[watch("selectedRoom") - 1]?.label ?? ""}
          </span>{" "}
          и тариф{" "}
          <span className="font-bold">
            {rates.find((rate) => rate.id === watch("selectedRate"))?.name ??
              ""}
          </span>
          .
          <br /> Для данной конфигурации стандартное размещение —{" "}
          <span className="font-bold">{maxGuests} гостя</span>
          . <br />
          <br />В разделе{" "}
          <span className="font-bold">цены по количеству гостей</span> вы
          сможете настроить цены для других вариантов размещения.
        </p>
        {/* FORM */}
        <div className="px-4 py-4">
          <h4 className="mb-4 text-sm font-semibold">Выберите диапазон дат</h4>
          <div className="flex gap-4">
            {/* DATE FROM */}
            <div className="relative flex flex-col">
              <label htmlFor="dateFrom" className="mb-2 text-sm">
                Дата начала
              </label>
              <input
                readOnly
                className="rounded border border-gray-300 px-4 py-2"
                value={
                  watch("dateFrom")
                    ? format(watch("dateFrom"), "dd.MM.yyyy")
                    : ""
                }
                onClick={onOpenDate("dateFrom")}
              />
              {openDate.dateFrom && (
                <div
                  className="absolute top-full bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DayPicker
                    locale={ru}
                    hidden={false}
                    id="dateFrom"
                    mode="single"
                    toDate={watch("dateTo")}
                    classNames={{
                      month: "capitalize",
                    }}
                    selected={watch("dateFrom")}
                    onSelect={(date?: Date) => {
                      if (!date) return;
                      setValue("dateFrom", date, { shouldValidate: true });
                      closeDates();
                    }}
                  />
                </div>
              )}
            </div>
            {/* DATE TO */}
            <div className="relative flex flex-col">
              <label htmlFor="dateTo" className="mb-2 text-sm">
                Дата окончания
              </label>
              <input
                className="rounded border border-gray-300 px-4 py-2"
                readOnly
                value={
                  watch("dateTo") ? format(watch("dateTo"), "dd.MM.yyyy") : ""
                }
                onClick={onOpenDate("dateTo")}
              />
              {openDate.dateTo && (
                <div
                  className="absolute top-full bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DayPicker
                    hidden={false}
                    id="dateTo"
                    locale={ru}
                    fromDate={watch("dateFrom")}
                    mode="single"
                    classNames={{
                      month: "capitalize",
                    }}
                    selected={watch("dateTo")}
                    onSelect={(date?: Date) => {
                      if (!date) return;
                      setValue("dateTo", date, { shouldValidate: true });
                      closeDates();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          {/* ACTIVE RANGE */}
          <div className="mb-8 mt-4 flex flex-wrap gap-2">
            {WEEKDAYS_SHORT.map((day, i) => (
              <div className="flex items-center gap-2" key={day}>
                <input
                  type="checkbox"
                  id={day}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("activeRange", [...watch("activeRange"), i + 1]);
                    } else {
                      setValue(
                        "activeRange",
                        watch("activeRange").filter((d: number) => d !== i + 1)
                      );
                    }
                  }}
                  className="h-4 w-4 rounded border border-gray-300"
                />
                <label className="text-sm" htmlFor={day}>
                  {day}
                </label>
              </div>
            ))}
          </div>
          {/* PRICE */}
          <NewInput
            label="Цена"
            id="price"
            name="price"
            required
            type="number"
            className="w-fit"
          />
        </div>
        {/* NEXT STEP */}
        <div className="mt-4 flex justify-center pb-4">
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className={
              "w-56 rounded px-4 py-2 text-white " +
              (watch("selectedRoom") !== undefined
                ? "bg-sky-500 hover:bg-sky-600"
                : "cursor-not-allowed bg-gray-300 opacity-50")
            }
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
}
