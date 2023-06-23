import { type UploadPhotoResponse } from "../register_property/upload_photos.types";

export type ObjectsInfo = {
  id: number;
  contactName: string;
  contactPhone1: string;
  contactPhone2?: string;
  imageIds: number[];
  name: string;
  stars: number;
  city: number;
  address: string;
  postCode: string;
  rooms: Array<PropertyRoom>;
  languageSpoken: string | number[];
  services: number[];
  category: string | number;
  images: UploadPhotoResponse[];
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
  minimumNonResidentPrice: number;
  minimumResidentPrice: number;
  totalRoomsNumber: number;
  status: "pending" | "accepted" | "rejected";
};

export type PropertyRoom = {
  id: number;
  roomType: string | number;
  roomName: string | number;
  surfaceArea: number;
  maxGuests: number;
  maxChildren: number;
  nonResidentPricePerNight: number;
  residentPricePerNight: number;
  similarRoomsNumber: number;
  allowedSmoking?: boolean;
  facilities: number[];
  imageIds: number[];
  images: UploadPhotoResponse[] | null;
  beds: {
    type: number;
    quantity: number;
  }[];
  extraBeds?: {
    type: number;
    quantity: number;
  }[];
};

export type Rates = {
  id: number;
  name: string;
  propertyId: number;
  mealPlans: string[];
  roomPlans: number[];
  rooms: { id: number; roomName: number }[];
};
