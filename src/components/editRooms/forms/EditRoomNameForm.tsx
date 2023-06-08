import {
  ROOM_NAMES,
  ROOM_TYPES,
} from "@/components/registerProperty/components/register_multi_form/utils/const_data";
import FormDropdown from "@/shared/UI/NewInput/FormDropdown";
import React from "react";
import { type UseFormSetValue } from "react-hook-form";
import { type EditRoom } from "../types/editRoomTypes";

export default function EditRoomNameForm({
  setValue,
  value,
}: {
  setValue: UseFormSetValue<EditRoom>;
  value: EditRoom;
}) {
  return (
    <div className="bg-white shadow">
      <h3 className="border-b px-4 py-4 text-xl font-semibold">Название</h3>

      <div className="mt-4 px-4">
        <FormDropdown
          selectedValue={{
            label: ROOM_TYPES[value.type - 1]!.label,
            value: value.type,
          }}
          onSelect={(value) => {
            setValue("type", value as number, {
              shouldValidate: true,
            });
            setValue(
              "name",
              ROOM_NAMES[
                ROOM_TYPES[(value as number) - 1]!.namespaceOffset + 1
              ]!.value - 1,
              { shouldValidate: true }
            );
          }}
          options={ROOM_TYPES}
          id={"type"}
          name={"type"}
          required
          label="Тип номера:"
        />
        <FormDropdown
          selectedValue={{
            label: ROOM_TYPES[value.type - 1]!.label,
            value: value.type,
          }}
          onSelect={(value) => {
            setValue("type", value as number, {
              shouldValidate: true,
            });
            setValue(
              "name",
              ROOM_NAMES[
                ROOM_TYPES[(value as number) - 1]!.namespaceOffset + 1
              ]!.value - 1,
              { shouldValidate: true }
            );
          }}
          options={ROOM_TYPES}
          id={"type"}
          name={"type"}
          required
          label="Тип номера:"
        />
      </div>
    </div>
  );
}
