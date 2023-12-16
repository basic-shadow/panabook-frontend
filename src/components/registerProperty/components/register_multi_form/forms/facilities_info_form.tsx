import { type IPropertyRoomWithFacilities } from "@/components/registerProperty/types/register_property_types";
import { useRegisterPropertyStore } from "@/components/registerProperty/store/store";
import RegisterPropertyButtons from "../buttons_box";
import RoomFacilitiesForm from "./widgets/room_facilities_form";
import { useEffect, useState } from "react";
import { type ISubmitBtnState } from "../register_multi_form";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";

export default function RoomFacilityForm({
  onGoBack,
  onNextStep,
  submitBtnState,
  setSubmitBtnState,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
  submitBtnState: ISubmitBtnState;
  setSubmitBtnState: (val: ISubmitBtnState) => void;
}) {
  const { notifyInfo } = useNotifications();
  // MULTIFORM STATE
  const propertyRooms = useRegisterPropertyStore(
    (state) => state.propertyRooms
  );
  const setValidFormPage = useRegisterPropertyStore(
    (state) => state.setValidFormPage
  );

  const [changesMade, setChangesMade] = useState(false);
  const [changedRooms, setChangedRooms] = useState<
    Record<number, IPropertyRoomWithFacilities[]> | undefined
  >();

  const onSaveData = (
    data: Partial<IPropertyRoomWithFacilities>,
    index: number
  ) => {
    const changedRoom = propertyRooms[index];
    const newRoom = { ...changedRoom, ...data };
    // @ts-ignore
    setChangedRooms((prev) => ({ ...prev, [index]: newRoom }));
  };

  function onSubmit() {
    if (!changedRooms) return;
    const changedRoomsArr = Object.values(changedRooms).flat();

    if (
      changedRoomsArr.some(
        (room) => room.extraBeds && room.extraBedsType?.length === 0
      )
    ) {
      return;
    }

    useRegisterPropertyStore.setState({
      propertyRooms: propertyRooms.map((room) => {
        const changedRoom = changedRoomsArr.find(
          (r) => r.roomType === room.roomType
        );
        return changedRoom ? changedRoom : room;
      }),
    });

    setChangedRooms(undefined);
    setSubmitBtnState({ changesMade: false, saveModalOpened: false });
    setChangesMade(false);
  }

  useEffect(() => {
    setSubmitBtnState({
      changesMade,
      saveModalOpened: false,
    });
    return () =>
      setSubmitBtnState({ saveModalOpened: false, changesMade: false });
  }, [changedRooms]);

  const onNextPage = () => {
    if (!changedRooms) return;
    const changedRoomsArr = Object.values(changedRooms).flat();
    if (changedRoomsArr.some((room) => room.roomFacilities?.length === 0)) {
      notifyInfo("Пожалуйста, заполните хотя бы 1 удобство в номере");
      return;
    }

    setValidFormPage("facilitiesInfo", true);
    if (!submitBtnState.changesMade && !submitBtnState.saveModalOpened) {
      onNextStep();
    } else if (submitBtnState.changesMade && submitBtnState.saveModalOpened) {
      onSubmit();
    } else {
      onSubmit();
      onNextStep();
    }
  };

  return (
    <div>
      {/* BUTTONS */}
      {propertyRooms.map((room, i) => (
        <RoomFacilitiesForm
          room={room}
          key={"room-facilities" + i}
          index={i}
          onSaveData={onSaveData}
          setChangesMade={setChangesMade}
        />
      ))}
      <RegisterPropertyButtons
        onGoBack={onGoBack}
        submitText={
          submitBtnState.changesMade && submitBtnState.saveModalOpened
            ? "Сохранить"
            : "Продолжить"
        }
        onNextStep={onNextPage}
      />
    </div>
  );
}
