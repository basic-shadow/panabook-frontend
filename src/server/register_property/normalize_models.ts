import { type IRegisterProperty } from "@/components/register-property/types/register_property_types";
import { type RegisterPropertyRequest } from "./register_property.types";

export const transformRegisterPropertyModel = (
  model: IRegisterProperty
): RegisterPropertyRequest => {
  return {
    hotelCategory: model.propertyCategory,
    city: model.propertyCity,
    stars: model.starsRating,
    postCode: model.propertyPostCode.trim(),
    checkInFrom: model.checkInTime.from,
    checkInTo: model.checkInTime.to,
    checkOutFrom: model.checkOutTime.from,
    checkOutTo: model.checkOutTime.to,
    hotelServices: model.propertyServices,
    imagesIds: model.propertyPhotos,
    languageSpoken: model.propertyLanguages,
    rooms: model.propertyRooms.map((room) => ({
      allowedSmoking: room.allowedSmoking === 0,
      facilities: room.roomFacilities || [],
      name: room.roomName,
      maxGuests: room.maxGuestSize,
      residentPricePerNight: room.nonResidentPrice,
      similarRoomsNumber: room.similarRoomsQuantity,
      type: room.roomType,
      beds: room.roomBeds,
      extraBeds: room.extraBeds ? room.extraBedsType || [] : [],
    })),
    name: model.propertyName.trim(),
    address: model.propertyAddress.trim(),
  };
};
