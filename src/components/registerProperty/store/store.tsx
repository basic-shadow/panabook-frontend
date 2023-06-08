import { create } from "zustand";
import { registerPropertyInitState } from "../types/register_property_init_state";
import { type IRegisterProperty } from "../types/register_property_types";

type formPageEnums =
  | "generalInfo"
  | "roomsInfo"
  | "policiesInfo"
  | "photosInfo"
  | "servicesInfo"
  | "facilitiesInfo";

type ValidFormPages = {
  [pages in formPageEnums]: boolean;
};

// const initValidFormPages: ValidFormPages = {
//   generalInfo: false,
//   roomsInfo: false,
//   policiesInfo: false,
//   photosInfo: false,
//   servicesInfo: false,
//   facilitiesInfo: false,
// };

export const useRegisterPropertyStore = create<IRegisterProperty>((set) => ({
  // & ValidFormPages
  ...registerPropertyInitState,
  // ...initValidFormPages,
}));
