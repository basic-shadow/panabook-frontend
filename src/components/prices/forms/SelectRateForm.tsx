import { type Rates } from "@/server/objects/objects.types";
import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export default function SelectRateForm({
  step,
  setStep,
  rates,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  rates: Rates[];
}) {
  const { watch, setValue } = useFormContext();

  const onSelectRate = useCallback(
    (index: number) => {
      return () => {
        setValue("selectedRate", index, {
          shouldValidate: true,
        });
      };
    },
    [setValue]
  );

  const toggleStep = (index: number) => () =>
    setStep((prev) => (prev === index ? -1 : index));

  const selected = (index: number) => watch("selectedRate") === index;

  return (
    <div className="mt-4 bg-white px-4 py-4 shadow">
      <div className="flex w-full items-center justify-between">
        <p
          className={
            "text-lg font-semibold " +
            (watch("selectedRate") !== undefined
              ? "text-green-600"
              : "text-black")
          }
        >
          2. Выберите тариф
        </p>
        <button className="text-sm text-sky-600" onClick={toggleStep(1)}>
          {step === 1 ? "Изменить" : "Свернуть"}
        </button>
      </div>
      <div
        className={`${
          step === 1 ? "mt-4 h-full" : "pointer-events-none h-0 overflow-hidden"
        }`}
      >
        <div className={`flex flex-wrap gap-6`}>
          {rates.map((rate) => (
            <div
              key={rate.id}
              className={
                "flex cursor-pointer items-center gap-2 rounded border px-3 py-2 " +
                (selected(rate.id) ? "border-sky-600" : "")
              }
              onClick={onSelectRate(rate.id)}
            >
              <div
                className={
                  "h-6 w-6 rounded-full border bg-white " +
                  (selected(rate.id) ? "border-sky-600" : "")
                }
              >
                <div
                  className={`ml-[15%] mt-[15%] h-[70%] w-[70%] rounded-full ${
                    selected(rate.id) ? "bg-sky-600" : "bg-white"
                  }`}
                ></div>
              </div>
              <span className="text-sm">{rate.name}</span>
            </div>
          ))}
        </div>
        {/* NEXT STEP */}
        <div className="mt-4 flex justify-center">
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
