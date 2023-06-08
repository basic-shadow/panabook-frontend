import { type IRegisterProperty } from "@/components/registerProperty/types/register_property_types";

export const normalizeTimeSlots = (state: IRegisterProperty) => {
  return [
    state.checkInTime.from,
    state.checkInTime.to,
    state.checkOutTime.from,
    state.checkOutTime.to,
  ];
};

export const normalizeTimeSlotsDropdown = (state: IRegisterProperty) => {
  const arr = ["12:00", "14:00", "15:00"];

  return [
    !arr.includes(state.checkInTime.from),
    !arr.includes(state.checkInTime.to),
    !arr.includes(state.checkOutTime.from),
    !arr.includes(state.checkOutTime.to),
  ];
};
