"use client";

import { generalInfoSchema } from "@/components/register-property/types/validations";
import { type IGeneralInfo } from "@/components/register-property/types/register_property_types";
import { useRegisterPropertyStore } from "@/components/register-property/store/store";
import AppDropdown from "@/shared/UI/AppDropdown/AppDropdown";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KAZAKHSTAN_CITIES } from "../utils/const_data";
import RegisterPropertyButtons from "../buttons_box";
import InputMask from "react-input-mask";

export default memo(function GeneralInfoForm({
  onGoBack,
  onNextStep,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
}) {
  // MULTIFORM INIT STATE
  const state = useRegisterPropertyStore();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    formState: { isValid, errors },
  } = useForm<IGeneralInfo>({
    resolver: yupResolver(generalInfoSchema),
    defaultValues: { ...state },
  });

  function onSubmit() {
    if (isValid) {
      useRegisterPropertyStore.setState((state) => ({
        ...getValues(),
        contact_phone1: "+" + getValues().contact_phone1.replace(/[^\d]/g, ""),
      }));
      onNextStep();
    }
  }

  return (
    <form className="w-full">
      {/* FIRST FORM BOX */}
      <div className="bg-white py-4 sm:py-6 lg:py-8">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* PROPERTY NAME INPUT */}
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="property_name"
              className="mb-2 inline-flex text-lg font-semibold text-gray-800"
            >
              Название вашего объекта размещения
            </label>
            <input
              {...register("property_name")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
            />
            {errors.property_name && (
              <p className="mt-2 text-start text-sm text-red-500">
                {errors.property_name.message}
              </p>
            )}

            <p className="mt-2 text-start text-sm text-gray-400">
              Гости будут видеть это название, когда будут искать место, чтобы
              остановиться на нашем сайте.
            </p>
          </div>
          {/* PROPERTY STARS INPUT */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="stars_rating"
              className="mb-2 inline-flex text-gray-800"
            >
              Количество звезд
            </label>
            <AppDropdown
              name="stars_rating"
              selectedValue={{
                label: watch().stars_rating,
                value: watch().stars_rating,
              }}
              options={Array.from({ length: 5 }, (_, i) => ({
                label: (i + 1).toString(),
                value: i + 1,
              }))}
              onSelect={(val) => {
                setValue("stars_rating", val as number, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.stars_rating && (
              <p className="mt-2 text-start text-sm text-red-500">
                {errors.stars_rating.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECOND FORM BOX */}
      <div className="mt-4 bg-white py-4 sm:py-6 lg:py-8">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* CONTACTS NAME INPUT */}
          <div className="mb-6 flex flex-col">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Контактные данные объекта размещения
            </h2>
            <label
              htmlFor="contact_name"
              className="mb-2 inline-flex text-sm text-gray-800"
            >
              Контактное лицо
            </label>
            <input
              {...register("contact_name")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
            />

            {errors.contact_name && (
              <p className="mt-2 text-start text-sm text-red-500">
                {errors.contact_name.message}
              </p>
            )}
          </div>
          {/* CONTACTS PHONE INPUT */}
          <div className="mb-6 flex gap-4">
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="contact_phone1"
                className="mb-2 inline-flex text-sm text-gray-800"
              >
                Номер телефона
              </label>
              <InputMask
                mask="+7(999)999-99-99"
                {...register("contact_phone1")}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.contact_phone1 && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.contact_phone1.message}
                </p>
              )}

              <p className="mt-2 text-start text-sm text-gray-400">
                Для того, чтобы мы могли помочь вам с регистрацией, в случае
                необходимости
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="contact_phone2"
                className="mb-2 inline-flex text-sm text-gray-800"
              >
                Номер телефона
              </label>
              <InputMask
                mask="+7(999)999-99-99"
                {...register("contact_phone2")}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />
            </div>
          </div>
        </div>
      </div>

      {/* THIRD FORM BOX */}
      <div className="mt-4 bg-white py-4 sm:py-6 lg:py-8">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {/* ADDRESS INPUT */}
          <div className="mb-6 flex flex-col">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Адрес объекта размещения
            </h2>
            <label
              htmlFor="property_address"
              className="mb-2 inline-flex text-sm text-gray-800"
            >
              Адрес
            </label>
            <input
              {...register("property_address")}
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
            />

            {errors.property_address && (
              <p className="mt-2 text-start text-sm text-red-500">
                {errors.property_address.message}
              </p>
            )}
          </div>
          {/* ADDRESS CITY INPUT */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="property_city"
              className="mb-2 inline-flex text-gray-800"
            >
              Город
            </label>
            <AppDropdown
              name="property_city"
              selectedValue={{
                label:
                  watch().property_city >= 0
                    ? KAZAKHSTAN_CITIES[watch().property_city]!.label
                    : "",
                value: watch().property_city,
              }}
              options={KAZAKHSTAN_CITIES}
              onSelect={(val) => {
                setValue("property_city", val as number, {
                  shouldValidate: true,
                });
              }}
            />

            {errors.property_city && (
              <p className="mt-2 text-start text-sm text-red-500">
                {errors.property_city.message}
              </p>
            )}
          </div>
          {/* ADDRESS ZIP CODE INPUT */}
          <div className="mb-6 flex flex-col">
            <label
              htmlFor="property_post_code"
              className="mb-2 inline-flex text-sm text-gray-800"
            >
              Почтовый индекс
            </label>
            <input
              {...register("property_post_code")}
              className="w-60 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
            />

            {errors.property_post_code && (
              <p className="mt-2 text-start text-sm text-red-500">
                {errors.property_post_code.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <RegisterPropertyButtons
        onGoBack={onGoBack}
        onNextStep={handleSubmit(onSubmit)}
      />
    </form>
  );
});
