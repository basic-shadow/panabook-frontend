import MainDashboard from "@/entities/mainDashboard/mainDashboard";
import { type IGeneralInfo } from "../register-property/types/register_property_types";
import React from "react";
import {
  policiesSchema,
  type PropertyPolicies,
} from "./types/editPoliciesTypes";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NewInput from "@/shared/UI/NewInput/NewInput";
import FormDropdown from "@/shared/UI/NewInput/FormDropdown";

export default function EditPropertyPoliciesPage({
  initState,
}: {
  initState?: IGeneralInfo;
}) {
  const formMethods = useForm<PropertyPolicies>({
    resolver: yupResolver(policiesSchema),
  });

  async function onSubmit(data: PropertyPolicies) {
    if (formMethods.formState.isValid) {
      console.log("submit");
    }
  }

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <FormProvider {...formMethods}>
          <div className="bg-white pb-4 shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Регистрация заезда
            </h3>
            <div className="mt-4 px-4">
              <NewInput
                id={"checkInFrom"}
                label={"С:"}
                name={"checkIn.from"}
                required
              />
              <NewInput
                id={"checkInTo"}
                label={"По:"}
                name={"checkIn.to"}
                required
              />
            </div>
          </div>
          <div className="mt-4 bg-white pb-4 shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Регистрация отъезда
            </h3>
            <div className="mt-4 px-4">
              <NewInput
                id={"checkOutFrom"}
                label={"С:"}
                name={"checkOut.from"}
                required
              />
              <NewInput
                id={"checkOutTo"}
                label={"По:"}
                name={"checkOut.to"}
                required
              />
            </div>
          </div>
          <div className="mt-4 bg-white pb-4 shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Домашние животные
            </h3>
            <div className="mt-4 px-4">
              <FormDropdown
                id={"allowPets"}
                label={"Можно ли у вас проживать с домашними животными?:"}
                name={"allowPets"}
                required
                options={[
                  { label: "Да", value: "true" },
                  { label: "Нет", value: "false" },
                ]}
                selectedValue={
                  formMethods.watch().allowPets
                    ? { label: "Да", value: "true" }
                    : { label: "Нет", value: "false" }
                }
                onSelect={(id: string | number) => {
                  formMethods.setValue(
                    "allowPets",
                    id === "true" ? true : false
                  );
                }}
              />
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
