import React from "react";
import { type PropertyDescription } from "../types/descriptionTypes";
import { type UseFormSetValue } from "react-hook-form";
import { PROPERTY_CATEGORIES } from "@/components/registerProperty/utils/const_data";
import NewInput from "@/shared/UI/NewInput/NewInput";
import FormDropdown from "@/shared/UI/NewInput/FormDropdown";

export default function GeneralDescriptionForm({
  setValue,
  value,
}: {
  setValue: UseFormSetValue<PropertyDescription>;
  value: PropertyDescription;
}) {
  return (
    <div className="px-4 py-4">
      <NewInput id={"name"} label={"Название:"} name={"name"} required />
      <NewInput
        id={"commission"}
        label={"Комиссия Panabooking.kz (%):"}
        name={"commission"}
        value={12}
        required
        disabled
      />
      <FormDropdown
        id={"type"}
        label="Тип объекта размещения:"
        name="type"
        selectedValue={{
          label: value.type >= 0 ? PROPERTY_CATEGORIES[value.type]!.label : "",
          value: value.type,
        }}
        options={PROPERTY_CATEGORIES}
        onSelect={(val) => {
          setValue("type", val as number, {
            shouldValidate: true,
          });
        }}
        required
      />
      <FormDropdown
        id={"stars"}
        label="Количество звезд:"
        name="stars"
        selectedValue={{
          label: value.stars,
          value: value.stars,
        }}
        options={Array.from({ length: 5 }, (_, i) => ({
          label: (i + 1).toString(),
          value: i + 1,
        }))}
        onSelect={(val) => {
          setValue("stars", val as number, {
            shouldValidate: true,
          });
        }}
        required
      />
      <NewInput
        id={"totalRooms"}
        label={"Общее количество номеров:"}
        name={"totalRooms"}
        required
      />
      <NewInput
        id={"priceForResidents"}
        label={"Минимальная цена за ночь:"}
        name={"priceForResidents"}
        required
      />
      <NewInput
        id={"priceForNonResidents"}
        label={"Минимальная цена за ночь для резидентов:"}
        name={"priceForNonResidents"}
        required
      />
    </div>
  );
}
