import { ROOM_TYPES } from "@/components/registerProperty/components/register_multi_form/utils/const_data";
import { type PropertyRoom } from "@/server/objects/objects.types";
import Image from "next/image";
import noImgPlaceholder from "@/assets/images/no_img_placeholder.jpeg";
import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export default function SelectRoomForm({
  step,
  setStep,
  rooms,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  rooms: PropertyRoom[];
}) {
  const { watch, setValue } = useFormContext();

  const onSelectRoom = useCallback(
    (index: number) => {
      return () => {
        setValue("selectedRoom", index, {
          shouldValidate: true,
        });
      };
    },
    [setValue]
  );

  const toggleStep = (index: number) => () =>
    setStep((prev) => (prev === index ? -1 : index));

  return (
    <div className="bg-white px-4 py-4 shadow">
      <div className="flex w-full items-center justify-between">
        <p
          className={
            "text-lg font-semibold " +
            (watch("selectedRoom") !== undefined
              ? "text-green-600"
              : "text-black")
          }
        >
          1. Выберите номер
        </p>
        <button className="text-sm text-sky-600" onClick={toggleStep(0)}>
          {step === 0 ? "Изменить" : "Свернуть"}
        </button>
      </div>
      <div
        className={`${
          step === 0 ? "mt-4 h-full" : "pointer-events-none h-0 overflow-hidden"
        }`}
      >
        <div className={`flex flex-wrap gap-6`}>
          {/* CARD */}
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              selected={watch("selectedRoom") === room.id}
              onClick={onSelectRoom(room.id)}
            />
          ))}
        </div>
        {/* NEXT STEP */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className={
              "w-56 rounded px-4 py-2 text-white " +
              (watch("selectedRoom") !== undefined
                ? "bg-sky-500 hover:bg-sky-600"
                : "cursor-not-allowed bg-gray-300 opacity-50")
            }
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
}

function RoomCard({
  room,
  selected,
  onClick,
}: {
  room: PropertyRoom;
  selected: boolean;
  onClick: () => void;
}) {
  const name = ROOM_TYPES[+room.roomType - 1]!.label;

  return (
    <div
      className={
        "relative border lg:w-[320px] " +
        (selected ? "border-2 border-sky-600" : "")
      }
      onClick={onClick}
    >
      {/* SELECTED */}
      <div
        className={
          "absolute left-4 top-4 h-8 w-8 rounded-full bg-white " +
          (selected ? "border-2 border-sky-600" : "")
        }
      >
        {selected && (
          <div className="ml-[15%] mt-[15%] h-[70%] w-[70%] rounded-full bg-sky-600"></div>
        )}
      </div>
      {/* IMAGE */}
      <div className="mb-4 xs:h-[140px] xs:w-full lg:h-[175px]">
        <Image
          className="inset-0 object-cover xs:h-[140px] xs:w-full lg:h-[175px] lg:w-[320px]"
          src={
            room.images && room.images.length > 0
              ? process.env.NEXT_PHOTO_BASE_URL + room.images[0]!.url
              : noImgPlaceholder
          }
          height={175}
          width={320}
          alt={name}
        />
      </div>
      <h3 className="mb-1 px-4 py-2 text-sm">{name}</h3>
      <p className="px-4 pb-4 text-sm">
        Стандартная вместимость:
        <span className="ml-1 font-bold text-gray-600">
          Взрослых: {room.maxGuests}
        </span>
        <span className="mx-1 font-bold text-gray-600">•</span>
        <span className="font-bold text-gray-600">Детей: 3</span>
      </p>
    </div>
  );
}
