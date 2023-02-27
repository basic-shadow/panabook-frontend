import {
  type IFacilitiesInfo,
  type IPropertyRoomWithFacilities,
} from "@/components/register-property/types/register_property_types";
import { facilitiesInfoSchema } from "@/components/register-property/types/validations";
import { useRegisterPropertyStore } from "@/components/register-property/store/store";
import { YES_NO_CHOICES } from "@/components/register-property/utils/const_data";
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
  // form state
  const [facilities, setFacilities] = useState<number[]>([]);

  const {
    watch,
    control,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<IFacilitiesInfo>({
    resolver: yupResolver(facilitiesInfoSchema),
    defaultValues: { extra_beds: false },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "extra_beds_type",
  });

  const onAddNewBed = () => {
    const roomBeds = getValues("extra_beds_type");
    if (roomBeds && roomBeds.length === BED_TYPES.length) return;

    const unSelectedBedType = BED_TYPES.find(
      (val) => !roomBeds!.find((prevBeds) => prevBeds.bed_type === val.value)
    );
    const bed_type = unSelectedBedType?.value || 1;
    append({ bed_type: bed_type, quantity: 1 });
  };

  useEffect(() => {
    onSaveData(
      {
        room_facilities: facilities,
        extra_beds: getValues().extra_beds,
        extra_beds_type: fields,
      },
      index
    );
  }, [facilities, fields, getValues().extra_beds]);

  return (
    <div className="mb-2 bg-white py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 w-full border-b">
          <h2 className="pb-2 text-xl font-semibold text-gray-800">
            {ROOM_NAMES[room.room_name]!.label}
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
          <div className="flex gap-4" aria-label="extra_beds">
            <RadioGroup
              name={"extra_beds" + index}
              options={YES_NO_CHOICES}
              selectedValue={{
                label:
                  YES_NO_CHOICES.find((ch) => ch.value == watch().extra_beds)
                    ?.label || "",
                value: watch().extra_beds as boolean,
              }}
              onSelect={(value) => {
                setValue("extra_beds", value as boolean, {
                  shouldValidate: true,
                });
              }}
            />
          </div>
          {errors.extra_beds && (
            <p className="mt-2 text-start text-sm text-red-500">
              {errors.extra_beds.message}
            </p>
          )}
          {/* ROOM BEDS INPUT */}
          {watch().extra_beds &&
            fields.map((field, index) => (
              <div className="flex items-center gap-4" key={field.id + index}>
                <AppDropdown
                  selectedValue={{
                    label: BED_TYPES[field.bed_type]!.label,
                    value: field.bed_type,
                  }}
                  options={BED_TYPES}
                  onSelect={(val) => {
                    update(index, {
                      bed_type: val as number,
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
                      bed_type: field.bed_type,
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
          {watch().extra_beds && (
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
            roomName={index.toString()}
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
