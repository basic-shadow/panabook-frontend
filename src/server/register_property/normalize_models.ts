import { type IRegisterProperty } from "@/components/register-property/types/register_property_types";
import { type RegisterPropertyRequest } from "./register_property.types";

export const transformRegisterPropertyModel = (
  model: IRegisterProperty
): RegisterPropertyRequest => {
  return {
    hotelCategory: model.property_category,
    city: model.property_city,
    stars: model.stars_rating,
    postCode: model.property_post_code.trim(),
    checkInFrom: model.check_in_time.from,
    checkInTo: model.check_in_time.to,
    checkOutFrom: model.check_out_time.from,
    checkOutTo: model.check_out_time.to,
    hotelServices: model.property_services,
    imagesIds: model.proprety_photos,
    languageSpoken: model.property_languages,
    rooms: model.property_rooms.map((room) => ({
      allowedSmoking: room.allowed_smoking === 0,
      facilities: room.room_facilities || [],
      name: room.room_name,
      maxGuests: room.max_guest_size,
      residentPricePerNight: room.non_resident_price,
      similarRoomsNumber: room.similar_rooms_quantity,
      type: room.room_type,
      beds: room.room_beds,
      extraBeds: room.extra_beds ? room.extra_beds_type || [] : [],
    })),
    name: model.property_name.trim(),
    address: model.property_address.trim(),
  };
};
