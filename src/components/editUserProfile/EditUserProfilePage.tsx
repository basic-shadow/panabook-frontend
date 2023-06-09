import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import NewInput from "@/shared/UI/NewInput/NewInput";
import { profileSchema } from "./types/editUserProfile.types";
import FormLabel from "@/shared/UI/NewInput/FormLabel";

export default function EditUserProfilePage(initState: any) {
  const formMethods = useForm({
    defaultValues: initState,
    resolver: yupResolver(profileSchema),
  });

  async function onSubmit(data: any) {
    if (formMethods.formState.isValid) {
      console.log("submit data = ", data);
    }
  }

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <FormProvider {...formMethods}>
          <div className="bg-white pb-4 shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Личные данные
            </h3>
            <div className="mt-4 px-4">
              <NewInput
                id={"checkInFrom"}
                label={"E-mail:"}
                name={"email"}
                value={"qwe"}
                disabled
              />
              <NewInput
                id={"password"}
                label={"Текущий пароль:"}
                name={"password"}
                required
              />
              <NewInput
                id={"firstName"}
                label={"Имя:"}
                name={"firstName"}
                required
              />
              <NewInput id={"lastName"} label={"Фамилия:"} name={"lastName"} />
              <NewInput
                id={"fatherName"}
                label={"Отчество:"}
                name={"fatherName"}
              />
              <NewInput
                id={"newPassword"}
                label={"Новый пароль:"}
                name={"newPassword"}
              />
              <NewInput
                id={"confirmNewPassword"}
                label={"Подтвердите новый пароль:"}
                name={"confirmNewPassword"}
              />
              <NewInput
                id={"contactPhone"}
                label={"Контактный телефон:"}
                name={"contactPhone"}
                maskType="phone"
              />
              <FormLabel label="Загрузите фото:" id={"photo"}>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  className="rounded-md border border-gray-300 px-4 py-2"
                />
              </FormLabel>
            </div>
          </div>
        </FormProvider>
        {/* SUBMIT */}
        <div className="my-8">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
            onClick={formMethods.handleSubmit(onSubmit, (err) => {
              console.log(err);
            })}
          >
            Сохранить
          </button>
        </div>
      </div>
    </MainDashboard>
  );
}
