import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import NewInput, { unmaskPhone } from "@/shared/UI/NewInput/NewInput";
import {
  type EditUserProfileInfo,
  profileSchema,
} from "./types/editUserProfile.types";
import FormLabel from "@/shared/UI/NewInput/FormLabel";
import { type UserInfo } from "@/server/user/user_info.types";
import { useUpdateUser } from "./api/editUsersQuery";

export default function EditUserProfileSection(initState: UserInfo) {
  // API QUERY
  const { mutateAsync, isLoading } = useUpdateUser();

  const formMethods = useForm<EditUserProfileInfo>({
    defaultValues: {
      firstName: initState.firstname,
      lastName: initState.surname ?? "",
      email: initState.email,
      newPassword: "",
      confirmNewPassword: "",
      contactPhone: initState.phoneNumber ?? "",
    },
    resolver: yupResolver(profileSchema),
  });

  async function onSubmit(data: EditUserProfileInfo) {
    if (formMethods.formState.isValid) {
      const unmaskedPhone = unmaskPhone(data.contactPhone);
      mutateAsync({
        ...data,
        contactPhone: unmaskedPhone,
      });
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
                id={"email"}
                label={"E-mail:"}
                name={"email"}
                value={initState.email}
                disabled
              />
              <NewInput
                id={"firstName"}
                label={"Имя:"}
                name={"firstName"}
                required
              />
              <NewInput id={"lastName"} label={"Фамилия:"} name={"lastName"} />
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
              {/* <FormLabel label="Загрузите фото:" id={"photo"}>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  className="rounded-md border border-gray-300 px-4 py-2"
                />
              </FormLabel> */}
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
