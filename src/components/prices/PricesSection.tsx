import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { type Rates, type PropertyRoom } from "@/server/objects/objects.types";
import noImgPlaceholder from "@/assets/images/no_img_placeholder.jpeg";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type PriceProperty, pricePropertySchema } from "./types/prices.types";
import SelectRoomForm from "./forms/SelectRoomForm";
import SelectRateForm from "./forms/SelectRateForm";
import SelectPriceForm from "./forms/SelectPriceForm";
import SelectDiscountForm from "./forms/SelectDiscountForm";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ROOM_TYPES } from "../registerProperty/components/register_multi_form/utils/const_data";
import { format } from "date-fns";

export type PriceDiscount = {
  [guestNumber: number]: {
    discount: number;
    enabled: boolean;
  };
};

export default function PricesSection({
  rates,
  rooms,
}: {
  rates: Rates[];
  rooms: PropertyRoom[];
}) {
  // SPACE SEPARATION
  const numberFormatter = Intl.NumberFormat("ru-RU");
  const [step, setStep] = useState(0);

  const formMethods = useForm<PriceProperty>({
    defaultValues: {
      activeRange: [],
    },
    resolver: yupResolver(pricePropertySchema),
  });

  const maxGuests = useMemo(() => {
    if (formMethods.watch("selectedRoom") === undefined) return 0;
    return (
      rooms.find((room) => room.id === formMethods.watch("selectedRoom"))
        ?.maxGuests ?? 0
    );
  }, [formMethods.watch("selectedRoom"), rooms]);

  // DISCOUNTS
  const [discountRate, setDiscountRate] = useState<{
    resident: PriceDiscount;
    nonResident: PriceDiscount;
  }>({ resident: {}, nonResident: {} });

  useEffect(() => {
    setDiscountRate({
      resident: Array.from({ length: maxGuests }, (_, i) => ({
        [i + 1]: { discount: 0, enabled: false },
      })).reduce((acc: PriceDiscount, cur) => ({ ...acc, ...cur }), {}),
      nonResident: Array.from({ length: maxGuests }, (_, i) => ({
        [i + 1]: { discount: 0, enabled: false },
      })).reduce((acc: PriceDiscount, cur) => ({ ...acc, ...cur }), {}),
    });
  }, [maxGuests]);

  const onSubmit = (data: PriceProperty) => {
    console.log(data);
  };

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div>
          <h2 className="flex items-center gap-2 px-4 py-4 text-lg font-semibold">
            <FaMoneyBillAlt size={22} />
            Мастер настройки цен
          </h2>
          {/* FORM */}
          <div className="flex justify-between gap-6">
            <div className="w-full">
              <FormProvider {...formMethods}>
                <SelectRoomForm step={step} setStep={setStep} rooms={rooms} />
                <SelectRateForm step={step} setStep={setStep} rates={rates} />
                <SelectPriceForm
                  step={step}
                  setStep={setStep}
                  rates={rates}
                  maxGuests={maxGuests}
                />
                <SelectDiscountForm
                  step={step}
                  setStep={setStep}
                  discountRate={discountRate}
                  setDiscountRate={setDiscountRate}
                />
                {/* SAVE */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={formMethods.handleSubmit(onSubmit)}
                    className={
                      "w-56 rounded px-4 py-2 text-white " +
                      (formMethods.formState.isValid
                        ? "bg-sky-500 hover:bg-sky-600"
                        : "cursor-not-allowed bg-gray-300")
                    }
                  >
                    Сохранить
                  </button>
                </div>
              </FormProvider>
            </div>
            {/* PREVIEW */}
            <div className="h-fit rounded border bg-white xs:w-full lg:w-[550px]">
              <h4 className="border-b px-4 py-4 text-lg font-bold">
                Предварительный просмотр изменений
              </h4>
              <div className="px-4 py-4">
                {formMethods.watch("selectedRoom") !== undefined ? (
                  <div className="mb-2">
                    <h5 className="mr-2 font-semibold">Номер:</h5>
                    <Image
                      src={
                        rooms.find(
                          (room) =>
                            room.id === formMethods.watch("selectedRoom")
                        )?.images
                          ? process.env.NEXT_PHOTO_BASE_URL! +
                            rooms.find(
                              (room) =>
                                room.id === formMethods.watch("selectedRoom")
                            )!.images![0]?.url
                          : noImgPlaceholder
                      }
                      alt={"room"}
                      width={300}
                      height={250}
                    />
                    <p className="mt-2">
                      {ROOM_TYPES[
                        +rooms.find(
                          (room) =>
                            room.id === formMethods.watch("selectedRoom")
                        )!.roomType - 1
                      ]?.label ?? ""}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-sky-500">
                    1. Выберите номер
                  </p>
                )}
                {formMethods.watch("selectedRate") !== undefined ? (
                  <div className="mb-2 mt-4 flex items-center justify-between">
                    <h5 className="mr-2 font-semibold">Тариф:</h5>
                    <p>
                      {
                        rates.find(
                          (rate) =>
                            rate.id === formMethods.watch("selectedRate")
                        )?.name
                      }
                    </p>
                  </div>
                ) : (
                  <p className="mb-2 mt-4 text-lg font-semibold text-sky-500">
                    2. Выберите тариф
                  </p>
                )}
                {formMethods.watch("dateFrom") !== undefined && (
                  <div className="mb-2 mt-4 flex items-center justify-between">
                    <h5 className="mr-2 font-semibold">Дата начала</h5>
                    <p>
                      {format(
                        formMethods.watch("dateFrom") as any,
                        "dd.MM.yyyy"
                      )}
                    </p>
                  </div>
                )}
                {formMethods.watch("dateTo") !== undefined && (
                  <div className="mb-2 mt-4 flex items-center justify-between">
                    <h5 className="mr-2 font-semibold">Дата окончания</h5>
                    <p>
                      {format(formMethods.watch("dateTo") as any, "dd.MM.yyyy")}
                    </p>
                  </div>
                )}
                {formMethods.watch("price") !== undefined &&
                formMethods.watch("price").toString().length > 0 ? (
                  <div className="mb-2 mt-4 flex w-full items-center justify-between">
                    <h5 className="mr-2 font-semibold">
                      Базовая цена ({maxGuests} гостя):
                    </h5>
                    <p className="text-center font-bold text-green-600">
                      {numberFormatter.format(formMethods.watch("price"))} тенге
                    </p>
                  </div>
                ) : (
                  <p className="mb-2 mt-4 text-lg font-semibold text-sky-500">
                    3. Укажите базовую цену
                  </p>
                )}
                {/* PRICES */}
                {formMethods.watch("price") !== undefined &&
                  formMethods.watch("price").toString().length > 0 &&
                  Object.entries(discountRate.nonResident)
                    .reverse()
                    .map(
                      ([key, val], i) =>
                        i !== 0 &&
                        val.enabled &&
                        val.discount > 0 && (
                          <div
                            key={"non-resident-price + " + i}
                            className="mb-2 mt-4 flex items-center justify-between"
                          >
                            <h5 className="mr-2 font-semibold">
                              {key} {+key === 1 ? "гость" : "гостя"}{" "}
                            </h5>
                            <p className="text-center font-bold text-green-600">
                              {Number(
                                numberFormatter.format(
                                  (+formMethods.watch("price") *
                                    (100 - val.discount)) /
                                    100
                                )
                              ).toFixed(2)}{" "}
                              тенге
                            </p>
                          </div>
                        )
                    )}
                {formMethods.watch("price") !== undefined &&
                  formMethods.watch("price").toString().length > 0 && (
                    <div className="mb-2 mt-6">
                      <h4 className="font-semibold">Цена для резидентов</h4>
                      {Object.entries(discountRate.resident)
                        .reverse()
                        .map(
                          ([key, val], i) =>
                            val.enabled &&
                            val.discount > 0 && (
                              <div
                                key={"resident-price + " + i}
                                className="mb-2 mt-4 flex items-center justify-between"
                              >
                                <h5 className="mr-2 font-semibold">
                                  {key} {+key === 1 ? "гость" : "гостя"}{" "}
                                </h5>
                                <p className="text-center font-bold text-green-600">
                                  {Number(
                                    numberFormatter.format(
                                      (+formMethods.watch("price") *
                                        (100 - val.discount)) /
                                        100
                                    )
                                  ).toFixed(2)}{" "}
                                  тенге
                                </p>
                              </div>
                            )
                        )}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
