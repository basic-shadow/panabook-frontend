import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { type IRegisterTimeInfo } from "../registerProperty/types/register_property_types";
import React from "react";
import {
  policiesSchema,
  type PropertyPolicies,
} from "./types/editPoliciesTypes";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDropdown from "@/shared/UI/NewInput/FormDropdown";

// time slots from 00:00 to 23:30 with 30 min step generate full array
const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";

  return `${hours > 9 ? hours : "0" + hours}:${minutes}`;
});

export default function EditPropertyPoliciesSection({
  initState,
}: {
  initState?: IRegisterTimeInfo;
}) {
  const formMethods = useForm<PropertyPolicies>({
    resolver: yupResolver(policiesSchema),
    defaultValues: initState,
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
              <FormDropdown
                selectedValue={{
                  label: formMethods.watch().checkInTime.from,
                  value: formMethods.watch().checkInTime.from,
                }}
                onSelect={(sTime) => {
                  formMethods.setValue("checkInTime.from", `${sTime}`);
                }}
                options={timeSlots.map((time) => ({
                  label: time,
                  value: time,
                }))}
                id={"checkInFrom"}
                name={"checkInFrom"}
                required
                label="С:"
              />
              <FormDropdown
                selectedValue={{
                  label: formMethods.watch().checkInTime.to,
                  value: formMethods.watch().checkInTime.to,
                }}
                onSelect={(sTime) => {
                  formMethods.setValue("checkInTime.to", `${sTime}`);
                }}
                options={timeSlots.map((time) => ({
                  label: time,
                  value: time,
                }))}
                id={"checkInTo"}
                label={"По:"}
                name={"checkInTime.to"}
                required
              />
            </div>
          </div>
          <div className="mt-4 bg-white pb-4 shadow">
            <h3 className="border-b px-4 py-4 text-xl font-semibold">
              Регистрация отъезда
            </h3>
            <div className="mt-4 px-4">
              <FormDropdown
                selectedValue={{
                  label: formMethods.watch().checkOutTime.from,
                  value: formMethods.watch().checkOutTime.from,
                }}
                onSelect={(sTime) => {
                  formMethods.setValue("checkOutTime.from", `${sTime}`);
                }}
                options={timeSlots.map((time) => ({
                  label: time,
                  value: time,
                }))}
                id={"checkOutFrom"}
                label={"С:"}
                name={"checkOutTime.from"}
                required
              />
              <FormDropdown
                selectedValue={{
                  label: formMethods.watch().checkOutTime.to,
                  value: formMethods.watch().checkOutTime.to,
                }}
                onSelect={(sTime) => {
                  formMethods.setValue("checkOutTime.to", `${sTime}`);
                }}
                options={timeSlots.map((time) => ({
                  label: time,
                  value: time,
                }))}
                id={"checkOutTo"}
                label={"По:"}
                name={"checkOutTime.to"}
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
                id={"allowedPets"}
                label={"Можно ли у вас проживать с домашними животными?:"}
                name={"allowedPets"}
                required
                options={[
                  { label: "Да", value: "true" },
                  { label: "Нет", value: "false" },
                ]}
                selectedValue={
                  formMethods.watch().allowedPets
                    ? { label: "Да", value: "true" }
                    : { label: "Нет", value: "false" }
                }
                onSelect={(id: string | number) => {
                  formMethods.setValue(
                    "allowedPets",
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
