export type ObjectsParsedInfo = {
  contactName: string;
  contactPhone1: string;
  contactPhone2?: string;

  name: string;
  stars: number;
  city: string;
  address: string;
  postCode: string;
  rooms: Array<ObjectsParsedRooms>;
  languageSpoken: string[];
  services: string[];
  category: string;
  imageIds: string[];
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
};

type ObjectsParsedRooms = {
  roomType: string;
  roomName: string;
  surfaceArea: number;
  maxGuests: number;
  nonResidentPricePerNight: number;
  residentPricePerNight: number;
  similarRoomsNumber: number;
  allowedSmoking?: boolean;
  facility: string[];
  beds: {
    type: string;
    quantity: number;
  }[];
  extraBeds?: {
    type: string;
    quantity: number;
  }[];
};
