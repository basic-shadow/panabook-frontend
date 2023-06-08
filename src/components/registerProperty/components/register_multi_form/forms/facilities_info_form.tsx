import { type IPropertyRoomWithFacilities } from "@/components/registerProperty/types/register_property_types";
import { useRegisterPropertyStore } from "@/components/registerProperty/store/store";
import React from "react";
import RegisterPropertyButtons from "../buttons_box";
import RoomFacilitiesForm from "./widgets/room_facilities_form";

export default function RoomFacilityForm({
  onGoBack,
  onNextStep,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
}) {
  // MULTIFORM STATE
  const propertyRooms = useRegisterPropertyStore(
    (state) => state.propertyRooms
  );

  const onSaveData = (
    data: Partial<IPropertyRoomWithFacilities>,
    index: number
  ) => {
    const changedRoom = propertyRooms[index];
    const newRoom = { ...changedRoom, ...data };
    const newRooms = [...propertyRooms];
    // @ts-ignore
    newRooms[index] = newRoom;

    useRegisterPropertyStore.setState({
      propertyRooms: newRooms,
    });
  };

  function onSubmit() {
    if (
      propertyRooms.some(
        (room) => room.extraBeds && room.extraBedsType?.length === 0
      )
    )
      return;
    onNextStep();
  }

  return (
    <div>
      {/* BUTTONS */}
      {propertyRooms.map((room, i) => (
        <RoomFacilitiesForm
          room={room}
          key={"room-facilities" + i}
          index={i}
          onSaveData={onSaveData}
        />
      ))}
      <RegisterPropertyButtons onGoBack={onGoBack} onNextStep={onSubmit} />
    </div>
  );
}
