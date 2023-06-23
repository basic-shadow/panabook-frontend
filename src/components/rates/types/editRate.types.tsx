import * as yup from "yup";
const requiredField = "Обязательное поле";

export type EditRateInfo = {
  name: string;
  roomTypes: number[];
};

export const rateSchema = yup.object().shape({
  name: yup.string().required(requiredField),
  roomTypes: yup
    .array()
    .of(yup.number().required(requiredField))
    .min(1, requiredField),
});

export const toRateDto = (
  data: EditRateInfo,
  meals: string[],
  objectId: number
) => ({
  objectId,
  name: data.name,
  roomIds: data.roomTypes,
  meals,
});

export type RateDto = ReturnType<typeof toRateDto>;
