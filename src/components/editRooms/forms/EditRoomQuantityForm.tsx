import React, { useMemo } from "react";
import { type UseFormSetValue } from "react-hook-form";
import { type EditRoom } from "../types/editRoomTypes";
import FormDropdown from "@/shared/UI/NewInput/FormDropdown";
import {
  BED_NUMBERS,
  BED_TYPES,
} from "@/components/registerProperty/components/register_multi_form/utils/const_data";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";

export default function EditRoomInfoForm({
  setValue,
  value,
}: {
  setValue: UseFormSetValue<EditRoom>;
  value: EditRoom;
}) {
  const bedTypesList = useMemo(() => {
    return BED_TYPES.map((bedType) => ({
      label: bedType.label,
      value: bedType.value,
      disabled: !!value.beds.find(
        (prevBeds) => prevBeds.type === bedType.value
      ),
    }));
  }, [value.beds]);

  const onDeleteBed = (index: number) => {
    const roomBeds = value.beds;
    roomBeds.splice(index, 1);
    setValue("beds", roomBeds, { shouldValidate: true });
  };

  const onAddNewBed = () => {
    const roomBeds = value.beds;
    if (roomBeds.length === BED_TYPES.length) return;

    const unSelectedBedType = BED_TYPES.find(
      (val) => !roomBeds.find((prevBeds) => prevBeds.type === val.value)
    );
    const bedType = unSelectedBedType?.value || 1;
    setValue("beds", [...roomBeds, { type: bedType, quantity: 1 }]);
  };

  return (
    <div className="bg-white shadow">
      <h3 className="border-b px-4 py-4 text-xl font-semibold">
        Количество кроватей в данном номере
      </h3>

      <div className="mt-4 px-4">
        {value.beds.map((bed, i) => (
          <div
            key={"bed" + bed.type + i}
            className="mb-2 flex items-center gap-4"
          >
            <FormDropdown
              selectedValue={{
                label: BED_TYPES[bed.type - 1]!.label,
                value: bed.type,
              }}
              options={bedTypesList}
              onSelect={(val) => {
                const roomBeds = value.beds;
                roomBeds[i]!.type = val as number;
                roomBeds[i]!.quantity = 1;

                setValue("beds", roomBeds, {
                  shouldValidate: true,
                });
              }}
              id={"beds." + i + ".type"}
              name={"beds." + i + ".type"}
            />
            <span>X</span>
            {/* BED NUMBER INPUT */}
            <FormDropdown
              selectedValue={{
                label: bed.quantity,
                value: bed.quantity,
              }}
              options={BED_NUMBERS}
              onSelect={(val) => {
                const roomBeds = value.beds;
                roomBeds[i]!.quantity = val as number;
                roomBeds[i]!.type = bed.type;

                setValue("beds", roomBeds, {
                  shouldValidate: true,
                });
              }}
              id={"beds." + i + ".quantity"}
              name={"beds." + i + ".quantity"}
            />
            {value.beds.length > 1 && (
              <AiOutlineMinusCircle
                onClick={() => onDeleteBed(i)}
                size={24}
                className="cursor-pointer text-indigo-500"
              />
            )}
          </div>
        ))}

        {/* ADD NEW ROOM BED */}
        {value.beds.length !== BED_TYPES.length && (
          <div
            className="mb-4 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-indigo-500 px-2 py-2 text-indigo-500"
            onClick={onAddNewBed}
          >
            <IoAddCircleOutline size={24} />
            Добавить кровать
          </div>
        )}
      </div>
    </div>
  );
}
