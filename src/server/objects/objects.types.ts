export type ObjectsInfo = {
  id: number;
  contactName: string;
  contactPhone1: string;
  contactPhone2?: string;

  name: string;
  stars: number;
  city: number;
  address: string;
  postCode: string;
  rooms: Array<PropertyRoom>;
  languageSpoken: string;
  services: string;
  category: string;
  imageIds: string[];
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
};

export type PropertyRoom = {
  roomType: string;
  roomName: string;
  surfaceArea: number;
  maxGuests: number;
  nonResidentPricePerNight: number;
  residentPricePerNight: number;
  similarRoomsNumber: number;
  allowedSmoking?: boolean;
  facility: string;
  beds: {
    type: string;
    quantity: number;
  }[];
  extraBeds?: {
    type: number;
    quantity: number;
  }[];
};
