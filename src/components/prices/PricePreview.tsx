import React from "react";
import Image from "next/image";
import { type Rates, type PropertyRoom } from "@/server/objects/objects.types";
import noImgPlaceholder from "@/assets/images/no_img_placeholder.jpeg";
import { ROOM_TYPES } from "../registerProperty/components/register_multi_form/utils/const_data";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { type PriceDiscount } from "./PricesSection";

export default function PricePreview({
  rooms,
  rates,
  maxGuests,
  discountRate,
  showHeader = false,
}: {
  rooms: PropertyRoom[];
  rates: Rates[];
  discountRate: {
    resident: PriceDiscount;
    nonResident: PriceDiscount;
  };
  maxGuests: number;
  showHeader?: boolean;
}) {
  const numberFormatter = Intl.NumberFormat("ru-RU");
  const { watch } = useFormContext();

  return (
    <div className="h-fit rounded border bg-white xs:w-full lg:w-[550px]">
      {showHeader && (
        <h4 className="border-b px-4 py-4 text-lg font-bold">
          Предварительный просмотр изменений
        </h4>
      )}
      <div className="px-4 py-4">
        {watch("selectedRoom") !== undefined ? (
          <div className="mb-2">
            <h5 className="mr-2 font-semibold">Номер:</h5>
            <Image
              src={
                rooms.find((room) => room.id === watch("selectedRoom"))?.images
                  ? process.env.NEXT_PHOTO_BASE_URL! +
                    rooms.find((room) => room.id === watch("selectedRoom"))!
                      .images![0]?.url
                  : noImgPlaceholder
              }
              alt={"room"}
              width={300}
              height={250}
            />
            <p className="mt-2">
              {ROOM_TYPES[
                +rooms.find((room) => room.id === watch("selectedRoom"))!
                  .roomType - 1
              ]?.label ?? ""}
            </p>
          </div>
        ) : (
          <p className="text-lg font-semibold text-sky-500">
            1. Выберите номер
          </p>
        )}
        {watch("selectedRate") !== undefined ? (
          <div className="mb-2 mt-4 flex items-center justify-between">
            <h5 className="mr-2 font-semibold">Тариф:</h5>
            <p>
              {rates.find((rate) => rate.id === watch("selectedRate"))?.name}
            </p>
          </div>
        ) : (
          <p className="mb-2 mt-4 text-lg font-semibold text-sky-500">
            2. Выберите тариф
          </p>
        )}
        {watch("dateFrom") !== undefined && (
          <div className="mb-2 mt-4 flex items-center justify-between">
            <h5 className="mr-2 font-semibold">Дата начала</h5>
            <p>{format(watch("dateFrom") as any, "dd.MM.yyyy")}</p>
          </div>
        )}
        {watch("dateTo") !== undefined && (
          <div className="mb-2 mt-4 flex items-center justify-between">
            <h5 className="mr-2 font-semibold">Дата окончания</h5>
            <p>{format(watch("dateTo") as any, "dd.MM.yyyy")}</p>
          </div>
        )}
        {watch("price") !== undefined &&
        watch("price").toString().length > 0 ? (
          <div className="mb-2 mt-4 flex w-full items-center justify-between">
            <h5 className="mr-2 font-semibold">
              Базовая цена ({maxGuests} гостя):
            </h5>
            <p className="text-center font-bold text-green-600">
              {numberFormatter.format(watch("price"))} тенге
            </p>
          </div>
        ) : (
          <p className="mb-2 mt-4 text-lg font-semibold text-sky-500">
            3. Укажите базовую цену
          </p>
        )}
        {/* PRICES */}
        {watch("price") !== undefined &&
          watch("price").toString().length > 0 &&
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
                      {numberFormatter.format(
                        +Number(
                          (+watch("price") * (100 - val.discount)) / 100
                        ).toFixed(2)
                      )}{" "}
                      тенге
                    </p>
                  </div>
                )
            )}
        {watch("price") !== undefined &&
          watch("price").toString().length > 0 && (
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
                          {numberFormatter.format(
                            +Number(
                              (+watch("price") * (100 - val.discount)) / 100
                            ).toFixed(2)
                          )}{" "}
                          тенге
                        </p>
                      </div>
                    )
                )}
            </div>
          )}
      </div>
    </div>
  );
}
