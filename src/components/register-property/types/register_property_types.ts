export type IRegisterProperty = {
  property_category: number;
  property_rooms: IPropertyRoomWithFacilities[];
  proprety_photos: number[];
} & IGeneralInfo &
  IServicesInfo &
  IRegisterTimeInfo;

export type IGeneralInfo = {
  property_name: string;
  stars_rating: number;
  contact_name: string;
  contact_phone1: string;
  contact_phone2?: string;
  property_address: string;
  property_city: number;
  property_post_code: string;
};

export type IServicesInfo = {
  property_languages: number[];
  property_services: number[];
};

export type IPropertyRoom = {
  room_type: number;
  room_name: number;
  allowed_smoking: number;
  similar_rooms_quantity: number;
  max_guest_size: number;
  room_beds: IRoomBed[];
  room_surface: number;
  non_resident_price: number;
};

export type IPropertyRoomWithFacilities = IPropertyRoom & IFacilitiesInfo;

export type IRegisterTimeInfo = {
  check_in_time: IRegisterDate;
  check_out_time: IRegisterDate;
};

export type IFacilitiesInfo = {
  extra_beds?: boolean;
  extra_beds_type?: IRoomBed[];
  room_facilities?: number[];
};

export type IRoomBed = {
  bed_type: number;
  quantity: number;
};

export type IRegisterDate = {
  from: string;
  to: string;
};
