import * as yup from "yup";

const requiredField = "Обязательное поле";
const positive = "Число должно быть положительным";

export type EditRoom = {
  type: number;
  name: number;
  maxGuests: number;
  maxChildren: number;
  surfaceArea: number;
  allowedSmoking: boolean;
  similarRoomsNumber: number;
  beds: {
    type: number;
    quantity: number;
  }[];
};

export const editRoomSchema = yup.object().shape({
  type: yup.number().required(requiredField),
  name: yup.number().required(requiredField),
  similarRoomsNumber: yup
    .number()
    .positive(positive)
    .typeError(requiredField)
    .required(requiredField),
  maxGuests: yup
    .number()
    .positive(positive)
    .typeError(requiredField)
    .required(requiredField),
  maxChildren: yup
    .number()
    .positive(positive)
    .typeError(requiredField)
    .required(requiredField),
  surfaceArea: yup
    .number()
    .positive(positive)
    .typeError(requiredField)
    .required(requiredField),
  allowedSmoking: yup.boolean().required(requiredField),
  beds: yup.array().of(
    yup.object().shape({
      type: yup.number().required(requiredField),
      quantity: yup.number().required(requiredField),
    })
  ),
});
