import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React, { useEffect, useMemo, useState } from "react";
import {
  type Rates,
  type PropertyRoom,
  type PriceDto,
} from "@/server/objects/objects.types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type PriceProperty, pricePropertySchema } from "./types/prices.types";
import SelectRoomForm from "./forms/SelectRoomForm";
import SelectRateForm from "./forms/SelectRateForm";
import SelectPriceForm from "./forms/SelectPriceForm";
import SelectDiscountForm from "./forms/SelectDiscountForm";
import { FaMoneyBillAlt } from "react-icons/fa";
import { usePropertyPriceObject } from "./api/usePropertyPriceQuery";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";
import Modal from "@/shared/UI/Modal/Modal";
import { useRouter } from "next/navigation";
import PricePreview from "./PricePreview";

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
  // ROUTER
  const router = useRouter();
  // NOTIFICATIONS
  const { notifyInfo } = useNotifications();
  // API
  const { mutateAsync, isLoading, isSuccess } = usePropertyPriceObject();
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

  const onSubmit = async (data: PriceProperty) => {
    if (!isLoading) {
      const discounts = Object.entries(discountRate.nonResident)
        .map(([key, val]) => ({
          guests: Number(key),
          amount: val.enabled
            ? (+formMethods.watch("price") * (100 - val.discount)) / 100
            : +formMethods.watch("price"),
          amountLocal: discountRate.resident[+key]?.enabled
            ? (+formMethods.watch("price") *
                (100 - discountRate.resident[+key]!.discount)) /
              100
            : +formMethods.watch("price"),
        }))
        .filter(
          (discount) =>
            discount.amount > 0 ||
            (discount.amountLocal && discount.amountLocal > 0)
        );
      const price: PriceDto = {
        activeDays: data.activeRange,
        price: data.price,
        ratePlansId: data.selectedRate,
        roomId: data.selectedRoom,
        discounts,
        startDate: data.dateFrom.toISOString(),
        endDate: data.dateTo.toISOString(),
      };
      await mutateAsync(price);
    } else {
      notifyInfo("Подождите, идет сохранение данных...");
    }
  };

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <FormProvider {...formMethods}>
          <div>
            <h2 className="flex items-center gap-2 px-4 py-4 text-lg font-semibold">
              <FaMoneyBillAlt size={22} />
              Мастер настройки цен
            </h2>
            {/* FORM */}
            <div className="flex justify-between gap-6">
              <div className="w-full">
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
              </div>
              {/* PREVIEW */}
              <PricePreview
                rooms={rooms}
                rates={rates}
                discountRate={discountRate}
                maxGuests={maxGuests}
                showHeader
              />
            </div>
          </div>
          <Modal
            open={isSuccess}
            onClose={() => router.refresh()}
            title={"Цены сохранены"}
            className="h-[70vh] overflow-y-auto"
          >
            <PricePreview
              rooms={rooms}
              rates={rates}
              discountRate={discountRate}
              maxGuests={maxGuests}
            />
          </Modal>
        </FormProvider>
      </div>
    </MainDashboard>
  );
}
