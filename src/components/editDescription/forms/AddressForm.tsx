import React from "react";
import { type PropertyDescription } from "../types/descriptionTypes";
import { type UseFormSetValue } from "react-hook-form";
import NewInput from "@/shared/UI/NewInput/NewInput";
import FormDropdown from "@/shared/UI/NewInput/FormDropdown";
import { KAZAKHSTAN_CITIES } from "@/components/registerProperty/components/register_multi_form/utils/const_data";

export default function AddressForm({
  setValue,
  value,
}: {
  setValue: UseFormSetValue<PropertyDescription>;
  value: PropertyDescription;
}) {
  return (
    <div className="px-4 py-4">
      <FormDropdown
        id={"city"}
        label="Город:"
        name="city"
        selectedValue={{
          label: value.city >= 0 ? KAZAKHSTAN_CITIES[value.city]!.label : "",
          value: value.city,
        }}
        options={KAZAKHSTAN_CITIES}
        onSelect={(val) => {
          setValue("city", val as number, {
            shouldValidate: true,
          });
        }}
        required
      />
      <NewInput id={"address"} label={"Адрес:"} name={"address"} required />
      <NewInput
        id={"contactName"}
        label={"Контактное лицо:"}
        name={"contactName"}
        required
      />
      <NewInput
        id={"contactPhone"}
        label={"Номер телефона:"}
        name={"contactPhone"}
        required
      />
      <NewInput
        id={"contactPhone2"}
        label={"Альтернативный номер телефона:"}
        name={"contactPhone2"}
      />
    </div>
  );
}
