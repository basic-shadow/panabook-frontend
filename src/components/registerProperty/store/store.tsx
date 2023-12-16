import { create } from "zustand";
import { registerPropertyInitState } from "../types/register_property_init_state";
import { type IRegisterProperty } from "../types/register_property_types";

type FormPageEnums =
  | "generalInfo"
  | "roomsInfo"
  | "photosInfo"
  | "servicesInfo"
  | "facilitiesInfo";

type ValidFormPages = {
  [pages in FormPageEnums]: boolean;
};

const initValidFormPages: ValidFormPages = {
  generalInfo: false,
  roomsInfo: false,
  photosInfo: false,
  servicesInfo: false,
  facilitiesInfo: false,
};

type RegisterPropertyMethods = {
  setValidFormPage: (page: FormPageEnums, val: boolean) => void;
};

export const useRegisterPropertyStore = create<
  IRegisterProperty & ValidFormPages & RegisterPropertyMethods
>((set) => ({
  ...registerPropertyInitState,
  ...initValidFormPages,
  setValidFormPage: (page: FormPageEnums, val: boolean) =>
    set(() => ({
      [page]: val,
    })),
}));
