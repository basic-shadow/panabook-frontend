import { generalInfoSchema } from "@/components/registerProperty/types/validations";
import type { IGeneralInfo } from "@/components/registerProperty/types/register_property_types";
import { useRegisterPropertyStore } from "@/components/registerProperty/store/store";
import AppDropdown from "@/shared/UI/AppDropdown/AppDropdown";
import { memo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KAZAKHSTAN_CITIES } from "../utils/const_data";
import RegisterPropertyButtons from "../buttons_box";
import { PhoneInputMask } from "@/shared/UI/Input/PhoneInputMask";
import { type ISubmitBtnState } from "../register_multi_form";

export default memo(function GeneralInfoForm({
  onGoBack,
  onNextStep,
  submitBtnState,
  setSubmitBtnState,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
  submitBtnState: ISubmitBtnState;
  setSubmitBtnState: (val: ISubmitBtnState) => void;
}) {
  // MULTIFORM INIT STATE
  const state = useRegisterPropertyStore();
  const setValidFormPage = useRegisterPropertyStore(
    (state) => state.setValidFormPage
  );

  const methods = useForm<IGeneralInfo>({
    resolver: yupResolver(generalInfoSchema),
    defaultValues: { ...state },
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { isValid, errors, isDirty },
  } = methods;

  function onSubmit() {
    if (isValid) {
      const contactPhone2 = getValues().contactPhone2;
      const newData = {
        ...getValues(),
        contactPhone1: "+" + getValues().contactPhone1.replace(/[^\d]/g, ""),
        contactPhone2:
          contactPhone2 !== undefined
            ? contactPhone2[contactPhone2.length - 1] !== "_"
              ? "+" + contactPhone2.replace(/[^\d]/g, "")
              : ""
            : "",
      };
      useRegisterPropertyStore.setState(() => newData);
      reset(newData);
      setSubmitBtnState({ changesMade: false, saveModalOpened: false });
      setValidFormPage("generalInfo", true);
    }
  }

  useEffect(() => {
    setSubmitBtnState({ changesMade: isDirty, saveModalOpened: false });

    return () =>
      setSubmitBtnState({ changesMade: false, saveModalOpened: false });
  }, [isDirty]);

  const onNextPage = (e: any) => {
    e.preventDefault();
    if (!submitBtnState.changesMade && !submitBtnState.saveModalOpened) {
      onNextStep();
    } else if (submitBtnState.changesMade && submitBtnState.saveModalOpened) {
      handleSubmit(onSubmit)();
    } else {
      handleSubmit(onSubmit)();
      onNextStep();
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="w-full">
        {/* FIRST FORM BOX */}
        <div className="bg-white py-4 sm:py-6 lg:py-8">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            {/* PROPERTY NAME INPUT */}
            <div className="mb-6 flex flex-col">
              <label
                htmlFor="propertyName"
                className="mb-2 inline-flex text-lg font-semibold text-gray-800"
              >
                Название вашего объекта размещения
              </label>
              <input
                {...register("propertyName")}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />
              {errors.propertyName && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.propertyName.message}
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
                htmlFor="starsRating"
                className="mb-2 inline-flex text-gray-800"
              >
                Количество звезд
              </label>
              <AppDropdown
                name="starsRating"
                selectedValue={{
                  label: watch().starsRating,
                  value: watch().starsRating,
                }}
                options={Array.from({ length: 5 }, (_, i) => ({
                  label: (i + 1).toString(),
                  value: i + 1,
                }))}
                onSelect={(val) => {
                  setValue("starsRating", val as number, {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.starsRating && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.starsRating.message}
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
                htmlFor="contactName"
                className="mb-2 inline-flex text-sm text-gray-800"
              >
                Контактное лицо
              </label>
              <input
                {...register("contactName")}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.contactName && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.contactName.message}
                </p>
              )}
            </div>
            {/* CONTACTS PHONE INPUT */}
            <div className="mb-6 flex gap-4">
              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="contactPhone1"
                  className="mb-2 inline-flex text-sm text-gray-800"
                >
                  Номер телефона
                </label>
                <PhoneInputMask name="contactPhone1" />

                {errors.contactPhone1 && (
                  <p className="mt-2 text-start text-sm text-red-500">
                    {errors.contactPhone1.message}
                  </p>
                )}

                <p className="mt-2 text-start text-sm text-gray-400">
                  Для того, чтобы мы могли помочь вам с регистрацией, в случае
                  необходимости
                </p>
              </div>
              <div className="flex flex-1 flex-col">
                <label
                  htmlFor="contactPhone2"
                  className="mb-2 inline-flex text-sm text-gray-800"
                >
                  Дополнительный номер телефона
                </label>
                <PhoneInputMask name="contactPhone2" />
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
                htmlFor="propertyAddress"
                className="mb-2 inline-flex text-sm text-gray-800"
              >
                Адрес
              </label>
              <input
                {...register("propertyAddress")}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.propertyAddress && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.propertyAddress.message}
                </p>
              )}
            </div>
            {/* ADDRESS CITY INPUT */}
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="propertyCity"
                className="mb-2 inline-flex text-gray-800"
              >
                Город
              </label>
              <AppDropdown
                name="propertyCity"
                selectedValue={{
                  label:
                    watch().propertyCity >= 0
                      ? KAZAKHSTAN_CITIES[watch().propertyCity]?.label ?? ""
                      : "",
                  value: watch().propertyCity,
                }}
                options={KAZAKHSTAN_CITIES}
                onSelect={(val) => {
                  setValue("propertyCity", val as number, {
                    shouldValidate: true,
                  });
                }}
              />

              {errors.propertyCity && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.propertyCity.message}
                </p>
              )}
            </div>
            {/* ADDRESS ZIP CODE INPUT */}
            <div className="mb-6 flex flex-col">
              <label
                htmlFor="propertyPostCode"
                className="mb-2 inline-flex text-sm text-gray-800"
              >
                Почтовый индекс
              </label>
              <input
                {...register("propertyPostCode")}
                className="w-60 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.propertyPostCode && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.propertyPostCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <RegisterPropertyButtons
          onGoBack={onGoBack}
          submitText={
            submitBtnState.saveModalOpened && submitBtnState.changesMade
              ? "Сохранить"
              : "Продолжить"
          }
          onNextStep={onNextPage}
        />
      </form>
    </FormProvider>
  );
});
