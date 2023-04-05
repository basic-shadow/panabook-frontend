export type RegisterPropertyRequest = {
  name: string;
  stars: number;
  city: number;
  address: string;
  postCode: string;
  rooms: Array<PropertyRoom>;
  languageSpoken: number[];
  services: number[];
  category: number;
  imageIds: number[];
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
};

type PropertyRoom = {
  roomType: number;
  roomName: number;
  surfaceArea: number;
  maxGuests: number;
  nonResidentPricePerNight: number;
  residentPricePerNight: number;
  similarRoomsNumber: number;
  allowedSmoking?: boolean;
  facility?: number[];
  beds: {
    type: number;
    quantity: number;
  }[];
  extraBeds?: {
    type: number;
    quantity: number;
  }[];
};
