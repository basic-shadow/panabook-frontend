import React from "react";
import { useFormContext } from "react-hook-form";
import { type PriceDiscount } from "../PricesSection";

export default function SelectDiscountForm({
  step,
  setStep,
  discountRate,
  setDiscountRate,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  discountRate: {
    resident: PriceDiscount;
    nonResident: PriceDiscount;
  };
  setDiscountRate: React.Dispatch<
    React.SetStateAction<{
      resident: PriceDiscount;
      nonResident: PriceDiscount;
    }>
  >;
}) {
  const { watch } = useFormContext();

  const toggleStep = (index: number) => () =>
    setStep((prev) => (prev === index ? -1 : index));

  const filledForm =
    watch("price") !== undefined &&
    `${watch("price")}`.length > 0 &&
    watch("dateTo") !== undefined &&
    watch("dateFrom") !== undefined &&
    (watch("activeRange") as []).length > 0;

  return (
    <div className="mt-4 bg-white shadow">
      <div className="flex w-full items-center justify-between px-4 py-4">
        <p
          className={
            "text-lg font-semibold " +
            (filledForm ? "text-green-600" : "text-black")
          }
        >
          4. Укажите цены по количеству гостей
        </p>
        <button className="text-sm text-sky-600" onClick={toggleStep(3)}>
          {step === 3 ? "Изменить" : "Свернуть"}
        </button>
      </div>
      <div
        className={`${
          step === 3 ? "h-full" : "pointer-events-none h-0 overflow-hidden"
        }`}
      >
        <p className="bg-amber-200 px-4 py-4 text-sm leading-6">
          <span className="font-bold">Внимание!</span> Скидки устанавливаются
          для сочетания Номер + Тариф без учета диапазона дат (на все даты).
        </p>
        {/* DISCOUNTS */}
        {discountRate && (
          <div className="px-4 py-4">
            {/* NONRESIDENTS TABLE */}
            <table>
              <thead>
                <tr className="border-b text-sm">
                  <th className="px-12 py-4">Число гостей</th>
                  <th className="px-12 py-4">Скидка</th>
                  <th className="px-12 py-4">Статус</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(discountRate.nonResident)
                  .reverse()
                  .map(([key, val], i) => (
                    <tr
                      key={"nonresident" + i}
                      className={`${i % 2 !== 0 && "bg-gray-100"} text-sm`}
                    >
                      <td className="px-12 py-4">
                        {key} {+key === 1 ? "гость" : "гостя"}
                      </td>
                      <td className="px-12 py-4">
                        {i === 0 ? (
                          "Базовая цена"
                        ) : (
                          <div>
                            <span className="mr-1">-</span>
                            <input
                              type="number"
                              value={val.discount}
                              className="w-20 rounded border px-2 py-1"
                              onChange={(e) => {
                                setDiscountRate((prev) => ({
                                  ...prev,
                                  nonResident: {
                                    ...prev.nonResident,
                                    [key]: {
                                      ...prev.nonResident[+key],
                                      discount:
                                        e.target.value === ""
                                          ? ""
                                          : +e.target.value <= 0
                                          ? 0
                                          : +e.target.value >= 99
                                          ? 99
                                          : +e.target.value,
                                    },
                                  },
                                }));
                              }}
                            />
                            <span className="ml-2">%</span>
                          </div>
                        )}
                      </td>
                      <td className="px-12 py-4">
                        {i !== 0 && (
                          <div className="flex items-center gap-2">
                            <div className="relative inline-block w-10 select-none gap-2 align-middle transition duration-200 ease-in">
                              <input
                                type="checkbox"
                                id={"nonresident_toggle" + i}
                                onChange={(e) => {
                                  setDiscountRate((prev) => ({
                                    ...prev,
                                    nonResident: {
                                      ...prev.nonResident,
                                      [key]: {
                                        ...prev.nonResident[+key],
                                        enabled: e.target.checked,
                                      },
                                    },
                                  }));
                                }}
                                className={
                                  "absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border bg-white transition-all " +
                                  (val.enabled ? "right-0" : "right-[50%]")
                                }
                              />
                              <label
                                htmlFor={"nonresident_toggle" + i}
                                className={
                                  "toggle-label block h-6 cursor-pointer overflow-hidden rounded-full " +
                                  (val.enabled
                                    ? "bg-green-500 "
                                    : "bg-gray-300")
                                }
                              ></label>
                            </div>
                            <span className="text-sm">
                              {val.enabled ? "Вкл" : "Выкл"}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* RESIDENTS TABLE */}
            <table className="mt-10">
              {/* DESRIPTION */}
              <caption className="bg-sky-500 py-4 text-sm text-white">
                Скидки для резидентов
              </caption>
              <thead>
                <tr className="border-b text-sm">
                  <th className="px-12 py-4">Число гостей</th>
                  <th className="px-12 py-4">Скидка</th>
                  <th className="px-12 py-4">Статус</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(discountRate.resident)
                  .reverse()
                  .map(([key, val], i) => (
                    <tr
                      key={"resident" + i}
                      className={`${i % 2 !== 0 && "bg-gray-100"} text-sm`}
                    >
                      <td className="px-12 py-4">
                        {key} {+key === 1 ? "гость" : "гостя"}
                      </td>
                      <td className="px-12 py-4">
                        <div>
                          <span className="mr-1">-</span>
                          <input
                            type="number"
                            value={val.discount}
                            className="w-20 rounded border px-2 py-1"
                            onChange={(e) => {
                              setDiscountRate((prev) => ({
                                ...prev,
                                resident: {
                                  ...prev.resident,
                                  [key]: {
                                    ...prev.resident[+key],
                                    discount:
                                      e.target.value === ""
                                        ? ""
                                        : +e.target.value <= 0
                                        ? 0
                                        : +e.target.value >= 99
                                        ? 99
                                        : +e.target.value,
                                  },
                                },
                              }));
                            }}
                          />
                          <span className="ml-2">%</span>
                        </div>
                      </td>
                      <td className="px-12 py-4">
                        <div className="flex items-center gap-2">
                          <div className="relative inline-block w-10 select-none gap-2 align-middle transition duration-200 ease-in">
                            <input
                              type="checkbox"
                              id={"resident_toggle" + i}
                              onChange={(e) => {
                                setDiscountRate((prev) => ({
                                  ...prev,
                                  resident: {
                                    ...prev.resident,
                                    [key]: {
                                      ...prev.resident[+key],
                                      enabled: e.target.checked,
                                    },
                                  },
                                }));
                              }}
                              className={
                                "absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border bg-white transition-all " +
                                (val.enabled ? "right-0" : "right-[50%]")
                              }
                            />
                            <label
                              htmlFor={"resident_toggle" + i}
                              className={
                                "toggle-label block h-6 cursor-pointer overflow-hidden rounded-full " +
                                (val.enabled ? "bg-green-500 " : "bg-gray-300")
                              }
                            ></label>
                          </div>
                          <span className="text-sm">
                            {val.enabled ? "Вкл" : "Выкл"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
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
