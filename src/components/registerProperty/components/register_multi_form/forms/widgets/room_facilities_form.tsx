import {
  type IFacilitiesInfo,
  type IPropertyRoomWithFacilities,
} from "@/components/registerProperty/types/register_property_types";
import { facilitiesInfoSchema } from "@/components/registerProperty/types/validations";
import { YES_NO_CHOICES } from "@/components/registerProperty/utils/const_data";
import { Accordion, RadioGroup } from "@/shared/UI";
import AppDropdown from "@/shared/UI/AppDropdown/AppDropdown";
import Checkbox from "@/shared/UI/Checkbox/Checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  BED_NUMBERS,
  BED_TYPES,
  FACILITIES_CATEGORIES,
  ROOM_NAMES,
} from "../../utils/const_data";
import { useRegisterPropertyStore } from "@/components/registerProperty/store/store";

export default function RoomFacilitiesForm({
  room,
  index,
  onSaveData,
}: {
  room: IPropertyRoomWithFacilities;
  index: number;
  onSaveData: (
    data: Partial<IPropertyRoomWithFacilities>,
    index: number
  ) => void;
}) {
  const roomFacilities = useRegisterPropertyStore(
    (state) => state.propertyRooms[index]?.roomFacilities
  );
  // form state
  const [facilities, setFacilities] = useState<number[]>(roomFacilities || []);

  const {
    watch,
    control,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<IFacilitiesInfo>({
    resolver: yupResolver(facilitiesInfoSchema),
    defaultValues: { extraBeds: false },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "extraBedsType",
  });

  const onAddNewBed = () => {
    const roomBeds = getValues("extraBedsType");
    if (roomBeds && roomBeds.length === BED_TYPES.length) return;

    const unSelectedBedType = BED_TYPES.find(
      (val) => !roomBeds!.find((prevBeds) => prevBeds.bedType === val.value)
    );
    const bedType = unSelectedBedType?.value || 1;
    append({ bedType: bedType, quantity: 1 });
  };

  useEffect(() => {
    onSaveData(
      {
        roomFacilities: facilities,
        extraBeds: getValues().extraBeds,
        extraBedsType: fields,
      },
      index
    );
  }, [facilities, fields, getValues().extraBeds]);

  return (
    <div className="mb-2 bg-white py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 w-full border-b">
          <h2 className="pb-2 text-xl font-semibold text-gray-800">
            {ROOM_NAMES[room.roomName - 1]!.label}
          </h2>
        </div>
        <div className="flex flex-col gap-6 border-b pb-4">
          {/* ROOM BEDS INPUT */}
          <h3 className="inline-flex text-lg font-semibold text-gray-800">
            Дополнительные кровати
          </h3>
          <label className="inline-flex text-base text-gray-800">
            Вы можете предложить дополнительные кровати?
          </label>
          <div className="flex gap-4" aria-label="extraBeds">
            <RadioGroup
              name={"extraBeds" + index}
              options={YES_NO_CHOICES}
              selectedValue={{
                label:
                  YES_NO_CHOICES.find((ch) => ch.value == watch().extraBeds)
                    ?.label || "",
                value: watch().extraBeds as boolean,
              }}
              onSelect={(value) => {
                setValue("extraBeds", value as boolean, {
                  shouldValidate: true,
                });
              }}
            />
          </div>
          {errors.extraBeds && (
            <p className="mt-2 text-start text-sm text-red-500">
              {errors.extraBeds.message}
            </p>
          )}
          {/* ROOM BEDS INPUT */}
          {watch().extraBeds &&
            fields.map((field, index) => (
              <div className="flex items-center gap-4" key={field.id + index}>
                <AppDropdown
                  selectedValue={{
                    label: BED_TYPES[field.bedType - 1]!.label,
                    value: field.bedType,
                  }}
                  options={BED_TYPES}
                  onSelect={(val) => {
                    update(index, {
                      bedType: val as number,
                      quantity: field.quantity,
                    });
                  }}
                />
                <span>X</span>
                {/* BED NUMBER INPUT */}
                <AppDropdown
                  selectedValue={{
                    label: field.quantity,
                    value: field.quantity,
                  }}
                  options={BED_NUMBERS}
                  onSelect={(val) => {
                    update(index, {
                      bedType: field.bedType,
                      quantity: val as number,
                    });
                  }}
                />
                {fields.length > 1 && (
                  <AiOutlineMinusCircle
                    size={24}
                    onClick={() => {
                      remove(index);
                    }}
                    className="cursor-pointer text-indigo-500"
                  />
                )}
              </div>
            ))}

          {/* ADD NEW ROOM BED */}
          {watch().extraBeds && (
            <div
              className="mb-4 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-indigo-500 px-2 py-2 text-indigo-500"
              onClick={onAddNewBed}
            >
              <IoAddCircleOutline size={24} />
              Добавить кровать
            </div>
          )}
        </div>
        {/* FACILITY INPUT */}
        <div className="mt-4 flex flex-col">
          <label className="mb-2 inline-flex text-lg font-semibold text-gray-800">
            Удобства в номере
          </label>
          <p className="mb-4 text-sm text-gray-400">
            Выберите удобства в номере
          </p>
          <Accordion
            id={index.toString()}
            headers={FACILITIES_CATEGORIES.map((val) => val.label)}
            content={FACILITIES_CATEGORIES.map((val) => {
              return val.value.map((facility) => (
                <div
                  key={facility.label + index}
                  className={"border-b px-2 py-4"}
                >
                  <Checkbox
                    id={"room" + index}
                    checked={facilities.includes(facility.value)}
                    onChange={(e) =>
                      setFacilities((fac) =>
                        !e.target.checked
                          ? fac.filter((q) => q !== facility.value)
                          : [...fac, facility.value]
                      )
                    }
                    text={facility.label}
                  />
                </div>
              ));
            })}
          />
        </div>
      </div>
    </div>
  );
}
