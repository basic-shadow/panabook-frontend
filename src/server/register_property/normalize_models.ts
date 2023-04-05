import { type IRegisterProperty } from "@/components/register-property/types/register_property_types";
import { type RegisterPropertyRequest } from "./register_property.types";

export const transformRegisterPropertyModel = (
  items: IRegisterProperty
): RegisterPropertyRequest => {
  return {
    address: items.propertyAddress,
    checkInFrom: items.checkInTime.from,
    checkInTo: items.checkInTime.to,
    checkOutFrom: items.checkOutTime.from,
    checkOutTo: items.checkOutTime.to,
    name: items.propertyName,
    city: items.propertyCity,
    category: items.propertyCategory,
    languageSpoken: items.propertyLanguages,
    postCode: items.propertyPostCode,
    rooms: items.propertyRooms.map((room) => ({
      roomName: room.roomName,
      roomType: room.roomType,
      maxGuests: room.maxGuestSize,
      nonResidentPricePerNight: room.nonResidentPrice,
      residentPricePerNight: room.nonResidentPrice,
      similarRoomsNumber: room.similarRoomsQuantity,
      allowedSmoking: room.allowedSmoking === 0,
      facility: room.roomFacilities,
      beds: room.roomBeds.map((val) => ({
        type: val.bedType,
        quantity: val.quantity,
      })),
      extraBeds: room.extraBedsType?.map((val) => ({
        type: val.bedType,
        quantity: val.quantity,
      })),

      surfaceArea: room.roomSurface,
    })),
    stars: items.starsRating,
    services: items.propertyServices,
    imageIds: items.propertyPhotos,
  };
};
