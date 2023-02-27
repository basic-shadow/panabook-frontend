import { type IRoomBed } from "@/components/register-property/types/register_property_types";

export type RegisterPropertyRequest = {
  city: number;
  name: string;
  stars: number;
  hotelCategory: number;
  address: string;
  postCode: string;
  rooms: PropertyRoom[];
  languageSpoken: number[];
  hotelServices: number[];
  imagesIds: number[];
  checkInFrom: string;
  checkInTo: string;
  checkOutFrom: string;
  checkOutTo: string;
};

type PropertyRoom = {
  type: number;
  name: number;
  beds: IRoomBed[];
  extraBeds: IRoomBed[];
  maxGuests: number;
  residentPricePerNight: number;
  allowedSmoking: boolean;
  similarRoomsNumber: number;
  facilities: number[];
};
