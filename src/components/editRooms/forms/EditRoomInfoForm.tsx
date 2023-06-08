import React from "react";
import { type UseFormSetValue } from "react-hook-form";
import { type EditRoom } from "../types/editRoomTypes";
import NewInput from "@/shared/UI/NewInput/NewInput";

export default function EditRoomInfoForm({
  setValue,
  value,
}: {
  setValue: UseFormSetValue<EditRoom>;
  value: EditRoom;
}) {
  return (
    <div className="mt-4 bg-white shadow">
      <h3 className="border-b px-4 py-4 text-xl font-semibold">
        Информация о номере
      </h3>

      <div className="mt-4 px-4 pb-4">
        <NewInput
          id={"maxGuests"}
          name={"maxGuests"}
          label="Максимальное количество гостей"
          type="number"
          required
        />
        <NewInput
          id={"maxChildren"}
          name={"maxChildren"}
          label="Максимальное количество детей"
          type="number"
          required
        />
        <NewInput
          id={"surfaceArea"}
          name={"surfaceArea"}
          label="Минимальная площадь номера"
          type="number"
          required
        />
        <div></div>
      </div>
    </div>
  );
}
