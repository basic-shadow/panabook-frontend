import {
  BED_TYPES,
  FACILITIES_CATEGORIES,
  KAZAKHSTAN_CITIES,
  LANGUAGES,
  PROPERTY_SERVICES,
  ROOM_NAMES,
  ROOM_TYPES,
} from "@/components/registerProperty/components/register_multi_form/utils/const_data";
import { PROPERTY_CATEGORIES } from "@/components/registerProperty/utils/const_data";
import {
  type PropertyRoom,
  type ObjectsInfo,
} from "@/server/objects/objects.types";
import { type ObjectsParsedInfo } from "@/types/objects.types";

const ALL_FACILITIES: { label: string; value: number }[] =
  FACILITIES_CATEGORIES.reduce(
    (acc: { label: string; value: number }[], category) => [
      ...acc,
      ...category.value,
    ],
    []
  );

export const normalizeStringToArrayNumber = (value: string): number[] => {
  if (typeof value === "string") {
    return value
      .substring(1, value.length - 1)
      .split(",")
      .map((v) => +v);
  } else {
    return (value as string[]).map((v) => +v);
  }
};

export const normalizePropertyValues = (
  propertyValues: ObjectsInfo
): ObjectsParsedInfo => {
  // @ts-ignore
  return Object.entries(propertyValues).reduce((acc, [key, value]) => {
    if (key === "city") {
      return {
        ...acc,
        city: KAZAKHSTAN_CITIES.find((city) => city.value == value)?.label,
      };
    } else if (key === "category") {
      return {
        ...acc,
        category: PROPERTY_CATEGORIES.find(
          (category) => category.value == +value
        )?.label,
      };
    } else if (key === "languageSpoken") {
      return {
        ...acc,
        languageSpoken: normalizeStringToArrayNumber(value as string).map(
          (val) => LANGUAGES.find((language) => language.value == val)?.label
        ),
      };
    } else if (key === "services") {
      return {
        ...acc,
        services: (value as number[]).map(
          (service) => PROPERTY_SERVICES.find((f) => f.value == +service)?.label
        ),
      };
    } else if (key === "rooms") {
      return {
        ...acc,
        rooms: (value as PropertyRoom[]).map((room) => ({
          ...room,
          facilities: room.facilities.map(
            (facility) =>
              ALL_FACILITIES.find((f) => f.value === facility)?.label
          ),
          beds: room.beds.map((bed) => ({
            ...bed,
            type: BED_TYPES.find((f) => f.value == +bed.type)?.label,
          })),
          extraBeds: room.extraBeds?.map((bed) => ({
            ...bed,
            type: BED_TYPES.find((f) => f.value == +bed.type)?.label,
          })),
          roomName: ROOM_NAMES.find((f) => f.value == +room.roomName)?.label,
          roomType: ROOM_TYPES.find((f) => f.value == +room.roomType)?.label,
        })),
      };
    }

    return {
      ...acc,
      [key]: value,
    };
  }, {});
};
