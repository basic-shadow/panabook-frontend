import { type IRegisterProperty } from "@/components/register-property/types/register_property_types";

export const normalizeTimeSlots = (state: IRegisterProperty) => {
  return [
    state.check_in_time.from,
    state.check_in_time.to,
    state.check_out_time.from,
    state.check_out_time.to,
  ];
};

export const normalizeTimeSlotsDropdown = (state: IRegisterProperty) => {
  const arr = ["12:00", "14:00", "15:00"];

  return [
    !arr.includes(state.check_in_time.from),
    !arr.includes(state.check_in_time.to),
    !arr.includes(state.check_out_time.from),
    !arr.includes(state.check_out_time.to),
  ];
};
