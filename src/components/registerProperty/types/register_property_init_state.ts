import {
  type IGeneralInfo,
  type IRegisterProperty,
  type IRegisterTimeInfo,
} from "./register_property_types";

export const generalInfoInitState: IGeneralInfo = {
  contactName: "",
  contactPhone1: "",
  contactPhone2: "",
  starsRating: 0,
  propertyPostCode: "",
  propertyAddress: "",
  propertyCity: -1,
  propertyName: "",
};

export const registerTimeInfoInitState: IRegisterTimeInfo = {
  checkInTime: {
    from: "",
    to: "",
  },
  checkOutTime: {
    from: "",
    to: "",
  },
};

export const registerPropertyInitState: IRegisterProperty = {
  propertyCategory: -1,
  propertyLanguages: [],
  propertyRooms: [],
  propertyPhotos: [],
  propertyServices: [],
  ...generalInfoInitState,
  ...registerTimeInfoInitState,
};
