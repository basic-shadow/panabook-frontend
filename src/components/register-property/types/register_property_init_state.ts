import {
  type IGeneralInfo,
  type IRegisterProperty,
  type IRegisterTimeInfo,
} from "./register_property_types";

export const generalInfoInitState: IGeneralInfo = {
  contact_name: "",
  contact_phone1: "",
  contact_phone2: "",
  stars_rating: 0,
  property_post_code: "",
  property_address: "",
  property_city: -1,
  property_name: "",
};

export const registerTimeInfoInitState: IRegisterTimeInfo = {
  check_in_time: {
    from: "",
    to: "",
  },
  check_out_time: {
    from: "",
    to: "",
  },
};

export const registerPropertyInitState: IRegisterProperty = {
  property_category: -1,
  property_languages: [],
  property_rooms: [],
  proprety_photos: [],
  property_services: [],
  ...generalInfoInitState,
  ...registerTimeInfoInitState,
};
