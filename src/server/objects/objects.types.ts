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
  imageUrls: string[];
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
  minimumNonResidentPrice: number;
  minimumResidentPrice: number;
  totalRoomsNumber: number;
};

export type PropertyRoom = {
  id: number;
  roomType: string;
  roomName: string;
  surfaceArea: number;
  maxGuests: number;
  nonResidentPricePerNight: number;
  residentPricePerNight: number;
  similarRoomsNumber: number;
  allowedSmoking?: boolean;
  facilities: string;
  // roomImages: {

  // }[],
  beds: {
    type: number;
    quantity: number;
  }[];
  extraBeds?: {
    type: number;
    quantity: number;
  }[];
};
