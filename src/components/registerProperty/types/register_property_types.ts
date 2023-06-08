export type IRegisterProperty = {
  propertyCategory: number;
  propertyRooms: IPropertyRoomWithFacilities[];
  propertyPhotos: { id: number; url: string }[];
} & IGeneralInfo &
  IServicesInfo &
  IRegisterTimeInfo;

export type IGeneralInfo = {
  propertyName: string;
  starsRating: number;
  contactName: string;
  contactPhone1: string;
  contactPhone2?: string;
  propertyAddress: string;
  propertyCity: number;
  propertyPostCode: string;
};

export type IServicesInfo = {
  propertyLanguages: number[];
  propertyServices: number[];
};

export type IPropertyRoom = {
  roomType: number;
  roomName: number;
  allowedSmoking: number;
  similarRoomsQuantity: number;
  maxGuestSize: number;
  roomBeds: IRoomBed[];
  roomSurface: number;
  nonResidentPrice: number;
};

export type IPropertyRoomWithFacilities = IPropertyRoom & IFacilitiesInfo;

export type IRegisterTimeInfo = {
  checkInTime: IRegisterDate;
  checkOutTime: IRegisterDate;
  allowedPets?: boolean;
};

export type IFacilitiesInfo = {
  extraBeds?: boolean;
  extraBedsType?: IRoomBed[];
  roomFacilities?: number[];
};

export type IRoomBed = {
  bedType: number;
  quantity: number;
};

export type IRegisterDate = {
  from: string;
  to: string;
};
